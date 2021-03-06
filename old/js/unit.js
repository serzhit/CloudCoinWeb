function Unit(an, i) {
    this.i = i;
    this.n1 = an[28];//Network Number
    this.sn = an[29];//Serial Number
    this.expDate = an[27];
    this.moneystatus = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];//0 Unknown, 1 Pass, F fail
    for (var i = 0; i < 25; i++) {
        this.moneystatus[i] = an[26].charAt(i);
    }//end for each money status
    this.escrowOwnerId = an[25];//Suppose to be 32 hex or 16 bytes
    this.ans = [an[0], an[1], an[2], an[3], an[4], an[5], an[6], an[7], an[8], an[9], an[10], an[11], an[12], an[13], an[14], an[15], an[16], an[17], an[18], an[19], an[20], an[21], an[22], an[23], an[24]];//Authenticity Numbers
    this.pans = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    this.startFile = "";
    this.endFile = "";
    this.coinID = this.n1 + this.sn;
    this.dataUri;//Used to hold data about the image that can be shown on the app

    //METHODS
    this.replaceText = function (text) {
        // alert("In function. This escrowOwnerId =" + this.n1);
        text = text.replace(/INDEX/g, this.i.toString());
        text = text.replace(/COINID/g, this.coinID); //alert("sn =" + this.sn);
        text = text.replace(/SERIALNUMBER/g, parseInt(this.sn, 16));//alert("sn2 =" + this.sn2);
        text = text.replace(/NOM/g, this.nom.toString());// alert("nom =" + this.nom);
        text = text.replace(/NETWORKID/g, this.n1.toString());// alert("n1 =" + this.n1);
        text = text.replace(/BASE64/g, this.dataUri);
        let expDateMonth = this.expDate.charAt(0);
        let expDateYear = parseInt(this.expDate.substring(1, 4), 16);
        text = text.replace(/EXPDATE/g, this.getExpDate());
        buttonArray = [];
        onClickArray = [];
        for (var i = 0; i < 25; i++) {
            //var serverNumber = i+1;
            //alert( this.moneystatus.toString() );
            switch (this.moneystatus[i]) {
                //1 = passed, 0=unknown, f=failed, a = Server did not respond properly
                case "0": buttonArray[i] = "secondary tiny button fi-wrench"; onClickArray[i] = "detectOnlyOne( " + i + ", " + this.i + "  ) ;"; break;
                case "a": buttonArray[i] = "warning fi-wrench"; onClickArray[i] = "fixRedundancy( " + i + ", " + this.i + "  ) ;"; break;
                case "f": buttonArray[i] = "alert"; onClickArray[i] = "fixRedundancy( " + i + ", " + this.i + "  ) ;"; break;
                case "1": buttonArray[i] = "success"; onClickArray[i] = "alert('This server was good when lasted tested');"; break;
            }//end switch
            text = text.replace("STATUS", buttonArray[i]);
            text = text.replace("ONCLICK", onClickArray[i]);
        }//end for

        return text;
    }//end replace Text

    this.getTitle = function () {
        thissn = parseInt(this.sn, 16);
        return "CloudCoin." + this.n1 + "." + thissn + ".jpg";
    }//end get title

    this.getSaveContentsJpg = function () {
        let returnString = "";
        for (var a = 0; a < 25; a++) { //ANs
            returnString += this.ans[a];
        }//end for all an
        returnString += "00000000000000000000000000000000";//this.escrowOwnerId;// Owner Use
        for (var i = 0; i < 25; i++) {//Status
            returnString += this.moneystatus[i];
        }//end for each money  status
        returnString += "0"; //ADD extra zero for status so that it is 26 hex or 13 bytes
        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        returnString += m.toString(16) + n.toString(16);//Experation date month and year in hexstring ie sep 2016 = 97E0
        returnString += this.n1.toString(16);//network id
        returnString += this.sn.toString(16);//Serial Number
        var something = hex2ab(returnString);
        var returnAbs = this.startFile;//Start of file
        returnAbs += something;
        returnAbs += this.endFile;
        return returnAbs;
    }//end get save ContentsJPG

    this.calcExpDate =  function (){
        var d = new Date();
        var m =  d.getMonth();
        var n = d.getFullYear();
        n = n+2;
        this.expDate = m.toString(16) + n.toString(16) ;
    }//end calc date

    function hex2ab(an) {
        var chCode = [];
        var res2 = "";
        var count = 0;
        for (i = 0; i < an.length; i = i + 2) {
            chCode[count] = parseInt(an.substring(i, i + 2), 16);
            res2 += String.fromCharCode(chCode[count]);
        }//end fo
      //  console.log(res2);
        return res2;
    }//end hex 2 ab

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    this.getNom = function getNom(sn) {

        var nom = "";
        if (sn < 2097153) { nom = 1; } else if (sn < 4194305) { nom = 5; } else if (sn < 6291457) { nom = 25; } else if (sn < 14680065) { nom = 100; } else if (sn < 16777217) { nom = 250; } else { nom = '0'; }
        return nom;
    }//End getNom

    this.nom = this.getNom(parseInt(this.sn, 16));//convert hex string to int.

    function pad_with_zeroes(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) { my_string = '0' + my_string; }
        return my_string;
    }//end pad with zeros

    this.fixedUrl = "n1=" + this.n1 + "&sn=" + parseInt(this.sn, 16); + "&denomination=" + this.nom;

    this.getExpDate = function(){
        return parseInt(this.expDate.substring(0, 1), 16) + "-" + parseInt(this.expDate.substring(1), 16);
    }

    this.dumpVals = function () {
        console.log("nom " + this.nom);
        console.log("n1 " + this.n1);
        console.log("sn " + parseInt(this.sn, 16));
        console.log("moneystatus " + this.moneystatus);
        console.log("Owner " + this.escrowOwnerId);
        console.log("ANs " + this.ans.toString());
        console.log("PANs " + this.pans.toString());
        console.log("Start of file " + this.startFile);
        console.log("Expiration date " + this.expDate);
        // console.log("End of file " + this.endFile);
        alert("Denomination: " + this.nom + "\n" + "Network ID: " + this.n1 + "\n" + "Serial Number: " + parseInt(this.sn, 16) + "\n"+"Money Status" + this.moneystatus + "\n" +  "Owner ID: " + this.escrowOwnerId + "\n" +
            "Expiration Date: " + parseInt(this.expDate.substring(0, 1), 16) + "-" + parseInt(this.expDate.substring(1), 16) + "\n" + "Authenticy Numbers:\n" + this.ans.toString());
    }//end dump vals
}//End of object Pie



