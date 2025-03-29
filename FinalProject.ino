#include <LiquidCrystal_I2C.h>
#include <Servo.h>
#include <DHT.h>


//LCD Settings
const int rs = 8, en = 9, d4 = 10, d5 = 11, d6 = 12, d7 = 13;
LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address 0x27, 16 column and 2 rows

//COMMUNICATION LED
const int bluePIN = 2;
const int greenPIN = 3;
const int yellowPIN = 4;
const int redPIN = 5;
const int whitePIN = 6;


//Soil moisture sensor
#define smPIN A7
#define SOIL_SENSOR_MIN 188
#define SOIL_SENSOR_MAX 464
#define MIN_SOIL_PARAMETER 25//WHEN IT GET 25% OF SOIL HUMIDITY WE NEED TO WATER THE PLANT
#define IDEAL_SOIL_PARAMETER 60//WHEN IT GET 25% OF SOIL HUMIDITY WE NEED TO WATER THE PLANT

//Water level sensor
const int wsOnOffPIN = 8;
#define wsSignalPIN A5
#define WATER_SENSOR_MIN 200
#define WATER_SENSOR_MAX 500

//Servo motor
Servo waterPumpServo;
const int servoPIN = 7;
int servoPos = 0;

//Photoresistor
#define prPIN A0
#define PHOTO_SENSOR_MIN 0
#define PHOTO_SENSOR_MAX 1024

//Temp & Humidity Sensor
#define thPIN 8    
#define DHTTYPE DHT11 
DHT dht(thPIN, DHTTYPE);

//START - AUXILIAR FUNCTIONS
void messageLCD(String text, int line, bool clear) {  
  if (clear) {
    lcd.clear();
  }  
  lcd.setCursor(0, line);
  lcd.print(text);      
}
//END - AUXILIAR FUNCTIONS


void setup() {
   //serial monitor
  Serial.begin(9600);

  //LCD Setups
  lcd.begin(16, 2);
  lcd.backlight();
  messageLCD("IoT - FINAL PROJECT", 0, true);            
 
  //COMMUNICATION LED
  pinMode(bluePIN, OUTPUT);
  digitalWrite(bluePIN, HIGH); 

  pinMode(greenPIN, OUTPUT);
  digitalWrite(greenPIN, HIGH); 

  pinMode(yellowPIN, OUTPUT);
  digitalWrite(yellowPIN, HIGH); 

  pinMode(redPIN, OUTPUT);
  digitalWrite(redPIN, HIGH);

  pinMode(whitePIN, OUTPUT);
  digitalWrite(whitePIN, HIGH); 

  //WATER LEVEL SENSOR
  pinMode(wsOnOffPIN, OUTPUT);
  digitalWrite(wsOnOffPIN, LOW);


  //SERVO setup
  waterPumpServo.attach(servoPIN, 500, 2500);

  //PHOTO RESISTOR setup
  pinMode(prPIN, INPUT);// Set pResistor - A0 pin as an input (optional)

  //TEMPERATURE AND HUMIDITY setup
  dht.begin();
  

}

//START - Controller functions
void communicationLEDController(int waterLevel, bool servoON, int photoLevel){

  bool blue = false;
  bool green = false;
  bool yellow = false;
  bool red = false;  
  
  //water level communication
  if (waterLevel >= 75) {
    green = true;
  } else {
    if (waterLevel >= 30) {
      yellow = true;
    } else {
      red = true;
    }
  }
  
  //water flow communication ON is flowing
  if (servoON) {
    blue = true;
  }

  //luminosity communication
  analogWrite(whitePIN, photoLevel);
  
  digitalWrite(bluePIN, blue);
  digitalWrite(greenPIN, green);
  digitalWrite(yellowPIN, yellow);
  digitalWrite(redPIN, red);
  
}

int waterLevelController(){
  int waterLevel = 0; // variable to store the sensor value
  //WATER LEVEL CONTROLE
  digitalWrite(wsOnOffPIN, HIGH);  // turn the Water level sensor ON  
  int waterLevelRead = analogRead(wsSignalPIN); // read the analog value from Water level sensor
  digitalWrite(wsOnOffPIN, LOW);   // turn the Water level sensor OFF
  //get water level
  waterLevel = map(waterLevelRead, WATER_SENSOR_MIN, WATER_SENSOR_MAX, 0, 100); 
  if (waterLevel < 0) {
    waterLevel = 0;
  }      

  Serial.print("WATER LEVEL: ");
  Serial.print(waterLevelRead);
  Serial.print(" - ");
  Serial.println(waterLevel);
  
  return waterLevel;

}

void servoMotorController(int rotation){
  servoPos = servoPos + rotation;
  waterPumpServo.write(servoPos);
}

int photoResistorController() {
  int prREAD = analogRead(prPIN);

  int prLevel = map(prREAD, PHOTO_SENSOR_MIN, PHOTO_SENSOR_MAX, 0, 255); 

  return prLevel; 
}

void temperatureAndHumidityController() {
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  int h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  int t = dht.readTemperature();
  
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  String lcdText = "H: ";
  lcdText.concat(String(h));
  lcdText.concat("% T: ");
  lcdText.concat(String(t));
  lcdText.concat(" C  ");
  messageLCD(lcdText, 0, false);

}

int soilMoistureController() {
  int smREAD = analogRead(smPIN);
  int smLEVEL = map(smREAD, SOIL_SENSOR_MAX, SOIL_SENSOR_MIN, 0, 100); 
  if (smLEVEL < 0) {
    smLEVEL = 0;
  } else {
    if (smLEVEL > 99) {
      smLEVEL = 100;
    }
  };

  String lcdText = "SOIL MOIS.: ";
  lcdText.concat(String(smLEVEL));
  lcdText.concat("%  ");
  messageLCD(lcdText, 1, false);


  return smLEVEL;
}

//END - Controller functions


void loop() {
  int soilMoistureLevel = soilMoistureController();  
  int waterLevel = waterLevelController();
  //OPEN WATER RESERVATORY
  if (servoPos == 0 && soilMoistureLevel < MIN_SOIL_PARAMETER && waterLevel > 0) 
  {
    servoMotorController(180);    
  }

  //CLOSE WATER RESERVATORY
  if (servoPos == 180 && (soilMoistureLevel > IDEAL_SOIL_PARAMETER || waterLevel <= 0) ) {
    servoMotorController(-180);        
  }
  
  //PARAMS - bool moistureOK, int waterLevel, bool servoON, int photoLevel  
  communicationLEDController(waterLevel, servoPos >= 180, photoResistorController()); 
  temperatureAndHumidityController();
  soilMoistureController();
  delay(200);
}
