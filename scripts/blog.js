//DINAMYC EXPERIENCES
//EVEN GOES LEFT, ODDS GO RIGHT
const blogItems = [
    {
        coverImage: "../images/tech_bio.jpg",
        tag: { color: "#096379", gradient: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,1) 35%, rgba(0,212,255,1) 100%)", text: "TECH" },
        title: "Precision Agriculture: The Future of Farming",
        description: "<p>Discover how smart technologies like marVase are transforming agriculture by optimizing resource use and boosting productivity.</p>" +            
            "<p><strong>IoT Sensors:</strong> Soil moisture sensors, similar to marVase, are widely used in regions like California to maintain optimal soil conditions for crops.</p>" +
            "<p><strong>Automated Irrigation Systems:</strong> These systems, popular in arid regions like Australia, conserve water by delivering precise amounts based on real-time data.</p>" +
            "<p><strong>AI-Powered Drones:</strong> Used to monitor crop health and detect early signs of pest infestation, reducing chemical usage and increasing yield.</p>",                    
        logos: ["../images/tech_bio.jpg"]
    },
    {
        coverImage: "../images/vertical_farm.jpg",
        tag: { color: "#fdbb2d", gradient: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(124,253,45,1) 100%)", text: "BIO" },
        title: "Smart Farming: Enhancing Sustainability",
        description: "<p>Explore how smart farming practices contribute to sustainable agriculture and environmental conservation.</p>" +
                     "<p>Sustainable technologies:</p>" +
                     "<p><strong>Vertical Farming:</strong> Growing crops on vertical surfaces in controlled environments reduces land use and water consumption.</p>" +
                     "<p><strong>Solar-Powered Equipment:</strong> Similar to marVase’s optional solar panels, solar-powered machinery minimizes energy consumption.</p>" +
                     "<p><strong>Precision Livestock Farming:</strong> Automated systems for monitoring animal health and welfare improve efficiency and reduce waste.</p>",
        logos: ["../images/vertical_farm.jpg"]
    },
    {
        coverImage: "../images/data_farm.jpg",
        tag: { color: "#fd1d1d", gradient:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,0.4889415238751751) 0%, rgba(252,176,69,1) 100%)", text: "DATA" },
        title: "Data-Driven Decisions for Better Yields",
        description: "<p>Learn how data analytics and smart devices are helping farmers make informed decisions to improve crop yields.</p>" +
                     "<p>Examples of data-driven farming:</p>" +
                     "<p><strong>GPS Mapping:</strong> Enables precise monitoring of soil conditions and water usage.</p>" +
                     "<p><strong>Predictive Analytics:</strong> AI tools analyze historical data and weather patterns to optimize planting schedules.</p>" +
                     "<p><strong>Smart Tractors:</strong> GPS-equipped tractors ensure precision in plowing, planting, and fertilizing.</p>",                     
        logos: ["../images/data_farm.jpg"]
    },    
    {
        coverImage: "../images/hydroponic_farm.jpg",
        tag: { color: "#94bbe9", gradient:"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)", text: "GLOBAL" },
        title: "Innovations in Agriculture: A Global Perspective",
        description: "<p>Global innovations:</p>" +
                     "<p><strong>Hydroponic Systems:</strong> Growing plants without soil, using nutrient-rich water, is gaining popularity in urban areas.</p>" + 
                     "<p><strong>Biotechnology:</strong> Genetic engineering enhances crop resilience to climate fluctuations.</p>" + 
                     "<p><strong>Robotics and Automation:</strong> Automated harvesters and planting machines reduce labor dependence.</p>",
        logos: ["../images/hydroponic_farm.jpg"]
    },    

];

//FUNCTION TO POOPULATE DIV OF EXPERIENCES
function fillBlog() {
    //get blog main container element
    const blog = document.getElementsByClassName("blog")[0];

    //create blog items in a loop reading the data
    blogItems.map(item => {
        let blogItem = document.createElement("div");
        blogItem.classList.add("blogItem");
        let blogItemImage = document.createElement("div");
        blogItemImage.classList.add("blogItemImage");
        let blogItemText = document.createElement("div");
        blogItemText.classList.add("blogItemText");
        let blogItemTag = document.createElement("div");
        blogItemTag.classList.add("blogItemTag");
        let blogItemTitle = document.createElement("div");
        blogItemTitle.classList.add("blogItemTitle");
        let blogItemContent = document.createElement("div");
        blogItemContent.classList.add("blogItemContent");
        let blogItemLogos = document.createElement("div");
        blogItemLogos.classList.add("blogItemsLogos");

        //image      
        //let blogItemImageImage = document.createElement("img");  
        //blogItemImageImage.src = item.coverImage;   
        blogItemImage.style.backgroundImage = "url(" + item.coverImage + ")";
        //blogItemImage.appendChild(blogItemImageImage);      
        blogItem.appendChild(blogItemImage);
        //tag
        let blogItemTagSpan = document.createElement("span");
        blogItemTagSpan.textContent = item.tag.text;
        blogItemTag.style.background = item.tag.gradient;
        blogItemTag.appendChild(blogItemTagSpan);
        blogItemText.appendChild(blogItemTag);
        //title
        let blogItemTitleH2 = document.createElement("h2");
        blogItemTitleH2.textContent = item.title;
        blogItemTitle.appendChild(blogItemTitleH2);
        blogItemText.appendChild(blogItemTitle);

        //Content
        blogItemContent.innerHTML = item.description;
        blogItemText.appendChild(blogItemContent);

        blogItem.appendChild(blogItemText);
        //Logos
        item.logos.map(logo => {
            let blogItemLogosLogo = document.createElement("div");
            blogItemLogosLogo.classList.add("blogItemsLogosImage");
            let blogItemLogosLogoImage = document.createElement("img");
            blogItemLogosLogoImage.src = logo;
            blogItemLogosLogo.appendChild(blogItemLogosLogoImage);
            blogItemLogos.appendChild(blogItemLogosLogo);
        })
        blogItem.appendChild(blogItemLogos);

        //appens blog item in the main container
        blog.appendChild(blogItem);

    })
}

/*
<div class="blogItem">
    <div class="blogItemImage"></div>
    <div class="blogText">
        <div class="blogItemTag">
            <span>Music</span>
        </div>    
        <div class="blogItemTitle">
            <h2>Heavy Metal</h2>
        </div>
        <div class="blogItemContent">
            <p>
                Heavy metal is a genre of rock music known for its loud, powerful sound, distorted guitars, and
                often dark or fantastical themes. Black Sabbath pioneered the genre in the late 1960s and early
                1970s with songs like "Paranoid" and "War Pigs," featuring doomy riffs and ominous lyrics. Iron
                Maiden brought a melodic and fast-paced style to metal with songs like "The Trooper" and
                "Hallowed Be Thy Name," emphasizing intricate guitar work and storytelling. Judas Priest, known
                for their twin-guitar attack and high-energy performances, helped define classic heavy metal
                with anthems like "Breaking the Law" and "Painkiller."
                Would you like more details on any of these bands or their songs?
            </p>
        </div>
    </div>
    <div class="blogItemsLogos">
        <div class="blogItemsLogosImage"></div>
        <div class="blogItemsLogosImage"></div>
        <div class="blogItemsLogosImage"></div>
    </div>
</div>
*/