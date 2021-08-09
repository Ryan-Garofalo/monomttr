const key = "6eb9607db19546aebe10dce90aa001fa" // jsfiddle key

document.addEventListener("DOMContentLoaded", initShowcaseSDK);

async function initShowcaseSDK(){
  const iframe = document.getElementById('showcase');
	const sdk = await MP_SDK.connect(iframe, key, "");
  
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

  
  sdk.on(sdk.Mattertag.Event.CLICK, navigateTag); // custom event
  
  async function navigateTag(sid){
  	await sdk.Mattertag.preventAction(sid, {
    	navigating: false,
      opening: true
    })
    await sdk.Mattertag.navigateToTag(sid, sdk.Mattertag.Transition.FLY);
    await sdk.Mattertag.preventAction(sid, {
    	navigating: true,
      opening: true
    });
    makeModal(sid);
  }
  
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