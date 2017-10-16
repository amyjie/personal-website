/* Only allow the user to start the animation sequence once per item */
let copyToClipboardLock = {
  Copied: true
};

function copyToClipboard(element) {
  let text = element.textContent;

  /* Check the lock */
  if(copyToClipboardLock[text] === true) { console.log("returned"); return; }
  else { copyToClipboardLock[text] = true; }

  /* Create textArea */
  let buffer = document.createElement("textarea");
  buffer.style.position = "fixed";
  document.body.appendChild(buffer);

  /* Add text to it and highlight it */
  buffer.textContent = text; 
  buffer.select();

  /* Attempt to copy to clipboard */
    try {
      document.execCommand("copy");

      /* Animate copy sequence */
      element.classList.add("copy-animation");
      window.setTimeout(() => {
        element.textContent = "Copied";
        element.classList.remove("copy-animation");
        window.setTimeout(() => {
          element.classList.add("copy-animation");
          window.setTimeout(() => {
            element.textContent = text;
            element.classList.remove("copy-animation");
              copyToClipboardLock[text] = false;
          }, 300);
        }, 300);
      }, 300);
    } 
    catch(error) {
        console.warn("Copy to clipboard failed.", error);
        copyToClipboardLock[text] = false;
    } 
    finally {
        document.body.removeChild(buffer);
    }
}

/* Social Media Tabs */
function setActiveTab(evt, index) {
	let tabs = document.getElementsByClassName('tab');
	Array.prototype.forEach.call(tabs, function(tab) {
		tab.classList.remove('active');
	});
	evt.currentTarget.classList.add('active');

	let links = document.getElementsByClassName('social-link');
	Array.prototype.forEach.call(links, function(link) {
		link.classList.remove('active');
	});
	links.item(index).classList.add('active');
}

/* Toggles the state */
var elements = ['smokescreen', 'box-wrapper', 'box', 'name-box', 'contact-info', 'social-media'];
var class_toggle = 'active';
var menu_active = false;
function toggleMenu() {
    for(var i = 0; i < elements.length; i++)
    {
        if(menu_active)
        {
            document.getElementById(elements[i]).classList.remove(class_toggle);
        }
        else
        {
            document.getElementById(elements[i]).classList.add(class_toggle);
        }

    }

    var lines = document.getElementsByTagName('line');
    for (i = 0; i < lines.length; i++)
    {
        if(menu_active)
        {
            lines[i].classList.remove(class_toggle);
        }
        else
        {
            lines[i].classList.add(class_toggle);
        }
    }

    menu_active = !menu_active;
}