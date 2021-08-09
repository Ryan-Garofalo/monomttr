const sdkKey = "6eb9607db19546aebe10dce90aa001fa" // jsfiddle key
const modelSid = "iL4RdJqi2yK";
const urlParameters = "&play=1&qs=1";
const numberIframes = 3;

document.addEventListener('DOMContentLoaded', initiateConnections);

async function initiateConnections(){
	const container = document.getElementById('iframe-container');
  const slaves = [];
  let masterFrame;
  for(let i=0; i<numberIframes; ++i){
  	const iframe = document.createElement('iframe');
    iframe.src = `https://my.matterport.com/show?m=${modelSid}${urlParameters}`;
    iframe.classList.add('iframe');
    if(i === 0){
      masterFrame = {"iframe": iframe};
    }else{
    	slaves.push({"iframe": iframe});
    }
    container.appendChild(iframe);
  }
  
  masterFrame.sdk = await showcaseHandler(masterFrame.iframe);
  
  slaves.forEach(async iframe => {
  	iframe.sdk = await showcaseHandler(iframe.iframe);
    
    masterFrame.sdk.Camera.pose.subscribe(pose => {
    	iframe.sdk.Camera.setRotation(pose.rotation, {speed: 360});
    });
    
    masterFrame.sdk.on(masterFrame.sdk.Sweep.Event.EXIT, (oldSid, newSid) =>{
    	iframe.sdk.Sweep.moveTo(newSid, {transition: iframe.sdk.Sweep.Transition.FLY})
    });
    
  });
  
  
}

async function showcaseHandler(iframe){
  const sdk = await window.MP_SDK.connect(iframe, sdkKey, '');
  return sdk;
}