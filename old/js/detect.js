var protocol="https";function checkConn(){for(var j=0;j<obj.server.length;j++){connect(obj.server[j].url,obj.server[j].name,j);}}
function connect($serverAddress,$name,j){obj.server[j].status="unknown";var HIDRA=new XMLHttpRequest();HIDRA.onreadystatechange=function(){if(HIDRA.readyState==4&&HIDRA.status==200){var request_time=new Date().getTime()- start_time;var jsonResponse=JSON.parse(HIDRA.responseText);console.log("Server: "+ $name+"\nStatus: "+ jsonResponse.status+". Time to process: "+ request_time+" ms<br>");if(jsonResponse.status=="ready"){obj.server[j].status="ready";obj.server[j].ms=request_time;document.getElementById($name).innerHTML=request_time+"<br>ms";document.getElementById($name).className="tiny success button";}else{document.getElementById($name).className="tiny alert button size-24";obj.server[j].status="error";}}else{document.getElementById($name).className="tiny alert button size-24";obj.server[j].status="no_contact";}};HIDRA.open("GET","https://"+ $serverAddress+"/service/echo."+ obj.server[j].ext,true);var start_time=new Date().getTime();HIDRA.send();}
function detectAll(i,mode){for(var s=0;s<obj.server.length;s++){if(obj.server[s].status=="ready"){document.getElementById(obj.server[s].name+"-"+ coins[i].coinID+"detect").className="tiny secondary button spinner";}else{document.getElementById(obj.server[s].name+"-"+ coins[i].coinID+"detect").className="tiny secondary button";pies[i].moneystatus[s]="0";}}
switch(mode){case"check":alert("We will now check to see if the Authenticty Numbers are correct with the RAIDA. The Authenticty Numbers will not be changed. If some servers fail, they may still have accurate authenticity numbers.");coins[i].pans=coins[i].ans.slice(0);break;case"take":alert("We will now attempt to change ownership through the RAIDA Servers. If some servers fail, you may still be able to fix afterwards. This file will save automatically but not overwrite the current file.");coins[i].pans=[generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID()];break;case"passphrase":break;case"barcode":break;}
var j=0;var boxid="";for(var s=0;s<obj.server.length;s++){boxid=obj.server[s].name+"-"+ coins[i].coinID+"detect";if(obj.server[s].status=="ready"){detectOne(protocol+"://"+ obj.server[s].url+"/service/detect."+obj.server[s].ext+"?"+ coins[i].fixedUrl+"&an="+ coins[i].ans[s]+"&pan="+ coins[i].pans[s]+"&denomination="+ coins[i].nom,s,obj.server[s].name,boxid,i);}}}
function detectOne(url,s,$name,boxid,i){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){var request_time=new Date().getTime()- start_time;if(xhr.readyState==4&&xhr.status!=200){detectCount++;alert("RAIDA "+ s+" had issues: "+ xhr.responseText);coins[i].moneystatus[s]="0";document.getElementById(boxid).className="warning tiny button fi-wrench";document.getElementById(boxid).setAttribute("onClick","javascript: detectOnlyOne("+ s+", "+ i+"); ");}
if(xhr.readyState==4&&xhr.status==200){document.getElementById(boxid).className="warning tiny button";if(xhr.responseText==""){alert("RAIDA Array "+ $name+" did not repond.");coins[i].moneystatus[s]="0";detectCount++;return;}
var jsonResponse=JSON.parse(xhr.responseText);console.log("Server: "+ $name+"\nStatus: "+ jsonResponse.status+". Time to process: "+ request_time+" ms<br>");switch(jsonResponse.status){case"fail":document.getElementById(boxid).className="alert tiny button fi-wrench";coins[i].moneystatus[s]="f";detectCount++;document.getElementById(boxid).setAttribute("onClick","javascript: fixRedundancy("+ s+", "+ i+");");break;case"pass":document.getElementById(boxid).className="success tiny button fi-like";coins[i].moneystatus[s]="1";coins[i].ans[s]=coins[i].pans[s];detectCount++;break;default:detectCount++;break;}}else{document.getElementById(obj.server[s].name+"-"+ coins[i].coinID+"detect").className="secondary tiny spinner button";}
if(detectCount==25){coins[i].calcExpDate();document.getElementById(coins[i].coinID+"ownership").className="alert small button";document.getElementById(coins[i].coinID+"ownership").value="You Now Own This";document.getElementById(coins[i].coinID+"gradeWord").value=coins[i].getExpDate();alert("Detection Complete. Your Authentication Numbers have been changed. Your CloudCoin will now be saved.");}}
xhr.open("GET",url,true);var start_time=new Date().getTime();xhr.send(null);}
function detectOnlyOne(s,i){let pan=generateUUID();coins[i].pans[s]=pan;let url="https://"+ obj.server[s].url+"/service/detect."+ obj.server[s].ext+ coins[i].fixedUrl+"&an="+ coins[i].ans[s]+"&pan="+ coins[i].pans[s]+"&denomination="+ coins[i].nom;let $name=obj.server[s].name;let boxid=obj.server[s].name+"-"+ coins[i].coinID+"detect";var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){var request_time=new Date().getTime()- start_time;if(xhr.readyState==4&&xhr.status!=200){alert("RAIDA "+ s+" had issues Please try again later. The error status was: "+ xhr.status);document.getElementById(boxid).className="secondary tiny button fi-wrench";return;}
if(xhr.readyState==4&&xhr.status==200){document.getElementById(boxid).className="warning tiny button";if(xhr.responseText==""){alert("RAIDA Array "+ $name+" did not repond.");coins[i].moneystatus[s]="0";detectCount++;return;}
var jsonResponse=JSON.parse(xhr.responseText);console.log("Server: "+ $name+"\nStatus: "+ jsonResponse.status+". Time to process: "+ request_time+" ms<br>");switch(jsonResponse.status){case"fail":document.getElementById(boxid).className="alert tiny button fi-wrench";coins[i].moneystatus[s]="f";detectCount++;document.getElementById(boxid).setAttribute("onClick","javascript: fix("+ s+");");break;case"pass":document.getElementById(boxid).className="success tiny button fi-like";coins[i].moneystatus[s]="1";coins[i].ans[s]=coins[i].pans[s];detectCount++;break;default:detectCount++;break;}}else{document.getElementById(obj.server[s].name+"-"+ coins[i].coinID+"detect").className="secondary tiny spinner button";}}
xhr.open("GET",url,true);var start_time=new Date().getTime();xhr.send(null);}
function download(binaryText,name){var a=document.createElement("a");var buf=str2ab(binaryText);var fileNew=new Blob([buf],{type:"image/jpeg"});a.href=URL.createObjectURL(fileNew);a.download=name;a.click();}
function fixRedundancy(s,i){if(obj.server[s].status=="ready"){document.getElementById(obj.server[s].name+"-"+ coins[i].coinID+"detect").className="tiny secondary button spinner";}else{alert("Server cannot be fixed because it is not available. Try checking the connection by pressing the CHECK button.");}
contactServers=[];var s=0;var b1=s- 1;var f1=s+ 1;var b5=s- 5;var f5=s+ 5;if(b1<0){b1=b1+ 25;}
if(f1>24){f1=f1- 25;}
if(b5<0){b5=b5+ 25;}
if(f5>24){f5=f5- 25;}
var listOfAvailables="";if(coins[i].moneystatus[b1]=="1"){listOfAvailables+=b1.toString()+",";}
if(coins[i].moneystatus[f1]=="1"){listOfAvailables+=f1.toString()+",";}
if(coins[i].moneystatus[b5]=="1"){listOfAvailables+=b5.toString()+",";}
if(coins[i].moneystatus[f5]=="1"){listOfAvailables+=f5.toString()+",";}
var firstTrustedServer=prompt("Please enter the first trusted server. Choose one of the available Servers: "+ b1+", "+ f1+", "+ b5+", "+ f5,b1);var secondTrustedServer=prompt("Please enter the second trusted server. . Choose one of the available Servers:"+ b1+", "+ f1+", "+ b5+", "+ f5,f1);if(firstTrustedServer!=null&&secondTrustedServer!=null&&listOfAvailables.includes(firstTrustedServer+",")&&listOfAvailables.includes(firstTrustedServer+","))
{contactServers=[firstTrustedServer,secondTrustedServer];}else{alert("The numbers "+ firstTrustedServer+" or "+ secondTrustedServer+" were incorrect. Enter servers avaiable and trusted. Try again.");return;}
var trustedRAIDA1Url=protocol+"://"+ obj.server[contactServers[0]].url+"/service/get_ticket."+obj.server[contactServers[0]].ext+"?"+ coins[i].fixedUrl+"&toserver="+ s+"&an="+ coins[i].ans[contactServers[0]]+"&pan="+ coins[i].ans[contactServers[0]]+"&denomination="+ coins[i].nom;var trustedRAIDA2Url=protocol+"://"+ obj.server[contactServers[1]].url+"/service/get_ticket."+obj.server[contactServers[1]].ext+"?"+ coins[i].fixedUrl+"&toserver="+ s+"&an="+ coins[i].ans[contactServers[1]]+"&pan="+ coins[i].ans[contactServers[1]]+"&denomination="+ coins[i].nom;var pan=generateUUID();var fracturedURL=protocol+"://"+ obj.server[s].url+"/service/fix."+obj.server[s].ext+"?fromserver1="+ contactServers[0]+"&fromserver2="+ contactServers[1]+"&pan="+ pan;var idName1=obj.server[s].name+"-"+ coins[i].coinID+"detect";var myFixer=new fixer(trustedRAIDA1Url,trustedRAIDA2Url,fracturedURL,idName1,s,i,pan);myFixer.fixIt();}
function generateUUID(){var r=new Random();var uuid='xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c){var ran=r.integer(0,15);return(c=='x'?ran:(r&0x3|0x8)).toString(16);});return uuid.toUpperCase();}
function readCoinCloudjpg(file,i){var reader=new FileReader();console.log(i);reader.onloadend=function(evt){if(evt.target.readyState==FileReader.DONE){let raw=evt.target.result;let imagePartArray=[];imagePartArray[0]=new Uint8Array(raw.slice(20,36));imagePartArray[1]=new Uint8Array(raw.slice(36,52));imagePartArray[2]=new Uint8Array(raw.slice(52,68));imagePartArray[3]=new Uint8Array(raw.slice(68,84));imagePartArray[4]=new Uint8Array(raw.slice(84,100));imagePartArray[5]=new Uint8Array(raw.slice(100,116));imagePartArray[6]=new Uint8Array(raw.slice(116,132));imagePartArray[7]=new Uint8Array(raw.slice(132,148));imagePartArray[8]=new Uint8Array(raw.slice(148,164));imagePartArray[9]=new Uint8Array(raw.slice(164,180));imagePartArray[10]=new Uint8Array(raw.slice(180,196));imagePartArray[11]=new Uint8Array(raw.slice(196,212));imagePartArray[12]=new Uint8Array(raw.slice(212,228));imagePartArray[13]=new Uint8Array(raw.slice(228,244));imagePartArray[14]=new Uint8Array(raw.slice(244,260));imagePartArray[15]=new Uint8Array(raw.slice(260,276));imagePartArray[16]=new Uint8Array(raw.slice(276,292));imagePartArray[17]=new Uint8Array(raw.slice(292,308));imagePartArray[18]=new Uint8Array(raw.slice(308,324));imagePartArray[19]=new Uint8Array(raw.slice(324,340));imagePartArray[20]=new Uint8Array(raw.slice(340,356));imagePartArray[21]=new Uint8Array(raw.slice(356,372));imagePartArray[22]=new Uint8Array(raw.slice(372,388));imagePartArray[23]=new Uint8Array(raw.slice(388,404));imagePartArray[24]=new Uint8Array(raw.slice(404,420));imagePartArray[25]=new Uint8Array(raw.slice(420,436));imagePartArray[26]=new Uint8Array(raw.slice(436,449));imagePartArray[27]=new Uint8Array(raw.slice(449,451));imagePartArray[28]=new Uint8Array(raw.slice(451,452));imagePartArray[29]=new Uint8Array(raw.slice(452,455));var value="",size=30,part=Array.apply(null,{length:size}).map(function(){return value;});for(var c=0;c<imagePartArray.length;c++){for(var ii=0;ii<imagePartArray[c].length;ii++){part[c]+=pad_with_zeroes(imagePartArray[c][ii].toString(16),2);}}
coins.push(new Unit(part,i));console.log("SN is "+ coins[i].sn);var fileReader2=new FileReader();fileReader2.onload=function(fileLoadedEvent){var srcData=fileLoadedEvent.target.result;var newImage=document.createElement('img');newImage.src=srcData;var fileReader3=new FileReader();fileReader3.readAsBinaryString(coincloudjpg);fileReader3.onloadend=function(evt3){if(evt3.target.readyState==FileReader.DONE){let raw3=evt3.target.result;coins[i].startFile=raw3.slice(0,20);coins[i].endFile=raw3.slice(455);coins[i].dataUri=window.btoa(raw3);var span=document.createElement('span');var text=document.getElementById('template').innerHTML;var goodtext=coins[i].replaceText(text);span.innerHTML=goodtext;document.getElementById('moneyGoesHere').insertBefore(span,null);}}}
fileReader2.readAsDataURL(coincloudjpg);}};var coincloudjpg=file.slice(0);reader.readAsArrayBuffer(coincloudjpg);}
function save(i){alert("Your money will be saved as "+ coins[i].getTitle()+". You may delete older versions as they are now unusable.");var a=document.createElement("a");var buf=str2ab(coins[i].getSaveContentsJpg());var fileNew=new Blob([buf],{type:"image/jpeg"});a.href=URL.createObjectURL(fileNew);a.download=coins[i].getTitle();a.click();}
function str2ab(str){var buf=new ArrayBuffer(str.length);var bufView=new Uint8Array(buf);for(var i=0,strLen=str.length;i<strLen;i++){bufView[i]=str.charCodeAt(i);}
return buf;}
function pad_with_zeroes(number,length){var my_string=''+ number;while(my_string.length<length){my_string='0'+ my_string;}
return my_string;}