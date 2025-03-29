class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="header">           
            <div>
                <div class="bars" onClick="openMenuLeft()">
                    <div></div>
                    <div></div>
                    <div></div>                                        
                </div>                
            </div>
            <div id="menuLeft" class="menuLeft">
              <span><a href="/marVase/index.html">home</a></span>
              <span><a href="/marVase/pages/about.html">about</a></span>
              <span><a href="/marVase/pages/portfolio.html">tutorials</a></span>
              <span><a href="/marVase/pages/blog.html">blog</a></span>
              <span><a href="/marVase/pages/contact.html">contact</a></span>
            </div>
            <div class="logo">
                <span>marVase.</span>
            </div>
           <div id="menu" class="menu">
              <span><a href="/marVase/index.html">home</a></span>
              <span><a href="/marVase/pages/about.html">about</a></span>
              <span><a href="/marVase/pages/portfolio.html">tutorials</a></span>
              <span><a href="/marVase/pages/blog.html">blog</a></span>
              <span><a href="/marVase/pages/contact.html">contact</a></span>
            </div>
        </div>
      `;
  }
}

function openMenuLeft() {
  const menuLeft = document.getElementById('menuLeft')
  // get all rendered styles
  const styles = window.getComputedStyle(menuLeft)
  if (styles.visibility == "hidden") {
    document.getElementById("menuLeft").style.visibility = "visible";
  }
  else {
    document.getElementById("menuLeft").style.visibility = "hidden";
  }
}

customElements.define('header-component', Header);