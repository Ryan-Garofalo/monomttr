const key = "6eb9607db19546aebe10dce90aa001fa" // jsfiddle key

document.addEventListener("DOMContentLoaded", initShowcaseSDK);

async function initShowcaseSDK(){
  const iframe = document.getElementById('showcase');
	const sdk = await MP_SDK.connect(iframe, key, "3.10");
  
  // prevent default behaviors for each Mattertag as it's added to Showcase
  sdk.Mattertag.data.subscribe({
  	onAdded: (index, item, collection) =>{
    
    	// Prevent the default opening behavior
    	sdk.Mattertag.preventAction(item.sid, {
      	navigating: true,
        opening: true
      });
    }
  });
  
  sdk.on(sdk.Mattertag.Event.CLICK, makeModal); // makeModal is the custom event
}

function makeModal(sid){
	const overlay = document.createElement('div');
  overlay.setAttribute('id', 'modal');
  
  const content = document.createElement('p');
  content.innerText = `Content for tag associated with tag ID ${sid}`;
  
  const button = document.createElement('button');
  button.innerText = "Close Modal";
  button.addEventListener('click', () => {
  	overlay.remove();
  });
  
  overlay.append(content);
  overlay.append(button);
  document.querySelector('.container').appendChild(overlay);
  
}