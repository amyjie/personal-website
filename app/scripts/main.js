/* Only allow the user to start the animation sequence once per item */
var copyToClipboardLock = {
  Copied: true
};

/* onclick function for elements allowing themselves to be copied */
function copyToClipboard(event) {
  var element = event.currentTarget;
  var text = element.textContent;

  /* Check the lock */
  if (copyToClipboardLock[text] === true) { return; }
  else { copyToClipboardLock[text] = true; }

  /* Create textArea */
  var buffer = document.createElement("textarea");
  buffer.style.position = "fixed";
  buffer.style.top = 0;
  buffer.style.height = 0;
  buffer.readOnly = true;

  document.body.appendChild(buffer);

  /* Add text to it and highlight it */
  buffer.textContent = text;
  buffer.select();

  /* Attempt to copy to clipboard */
    try {
      document.execCommand("copy");
      document.body.removeChild(buffer);

      /* Animate copy sequence */
      element.classList.add("copy-animation");
      window.setTimeout(function() {
        element.textContent = "Copied";
        element.classList.remove("copy-animation");
        window.setTimeout(function() {
          element.classList.add("copy-animation");
          window.setTimeout(function() {
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
        document.body.removeChild(buffer);
    } 
}

/* Set copyToClipboard onclick to all 'copyable' elements */
var copyable_elements = document.getElementsByClassName('copyable');
for (var i = 0; i < copyable_elements.length; i++) {
  console.log(copyable_elements.item(i));
  copyable_elements.item(i).addEventListener('click', copyToClipboard);
}

 // Social Media Tabs 
function setActiveTab(evt, index) {
	var tabs = document.getElementsByClassName('tab');
	Array.prototype.forEach.call(tabs, function(tab) {
		tab.classList.remove('active');
	});
	evt.currentTarget.classList.add('active');

	var links = document.getElementsByClassName('social-link');
	Array.prototype.forEach.call(links, function(link) {
		link.classList.remove('active');
	});
	links.item(index).classList.add('active');
}

/* Toggles the state */
var elements = ['box-wrapper', 'box', 'name-box', 'contact-info', 'social-media', 'links'];
var class_toggle = 'active';
var menu_active = true;
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

window.setTimeout(toggleMenu, 500);