
// coz we're only using html, add the onload here, so we don't need it additionally on every single little page...
window.onload = fnLoad;
window.onunload = fnUnload;

function ShowMainMenu() {
    var prefix = "";
    // some of the pages are in sub folders, so the rubbish, quick and dity way is to check in the url for some pre-defined names
    var url = location.pathname;
    var arrExceptions = new Array("NZ03");
    for (var i = 0; i < arrExceptions.length; i++) {
        if (url.indexOf(arrExceptions[i]) > -1) {
            prefix = "../";
            break;
        }
    }

    // now for the tedium...  determine which menu item should be selected...  The alternative is to have a naming convention, but I couldn't revamp my NZ site quickly, if I did that...
    var arrHome = new Array("/home.htm");
    var arrAbout = new Array("/NZ03/", "/cv.htm", "/ou.htm", "/udacity.htm", "/android.htm");
    var arrWork = new Array("/work.htm");
    var arrInterests = new Array("/interests.htm", "/photos.htm", "/general.htm");
    var arrFun = new Array("/HTML5/Shiny/", "/battleringers/");

    var classText = " selected"
    var home = "";
    var about = "";
    var work = "";
    var interests = "";
    var fun = "";
    var bFound = false;

    for (var i = 0; i < arrHome.length; i++) {
        if (url.indexOf(arrHome[i]) > -1) {
            home = classText;
            bFound = true;
            break;
        }
    }
    if (bFound == false) {
        for (var i = 0; i < arrAbout.length; i++) {
            if (url.indexOf(arrAbout[i]) > -1) {
                about = classText;
                bFound = true;
                break;
            }
        }
    }
    if (bFound == false) {
        for (var i = 0; i < arrWork.length; i++) {
            if (url.indexOf(arrWork[i]) > -1) {
                work = classText;
                bFound = true;
                break;
            }
        }
    }
    if (bFound == false) {
        for (var i = 0; i < arrInterests.length; i++) {
            if (url.indexOf(arrInterests[i]) > -1) {
                interests = classText;
                bFound = true;
                break;
            }
        }
    }
    if (bFound == false) {
        for (var i = 0; i < arrFun.length; i++) {
            if (url.indexOf(arrFun[i]) > -1) {
                fun = classText;
                bFound = true;
                break;
            }
        }
    }


    var d = document;
    d.write("<ul class='nav'>");
    d.write("    <li class='parent" + home + "'><a href='" + prefix + "home.htm'>home<!--[if gte IE 7]><!--></a><!--</a><!--<![endif]-->" +
                     "<!--[if lte IE 6]<table><tr><td><![endif]-->" +
                     "<div>" +
                     "    <dl>" +
                     "        <dt>click the word to return to my home page</dt>" +
                     "        <dd><a href='" + prefix + "home.htm'>go home</a></dd>" +
                     "    </dl>" +
                     "</div>" +
                     "<!--[if lte IE 6]</td></tr></table></a><![endif]-->" +
                "</li>");
    d.write("    <li class='parent" + about + "'><a href='#'>about me<!--[if gte IE 7]><!--></a><!--</a><!--<![endif]-->" +
                     "<!--[if lte IE 6]<table><tr><td><![endif]-->" +
                     "<div>" +
                     "    <dl>" +
                     "        <dt>erm...  me!!</dt>" +
//                     "        <dd><a href='" + prefix + "general.htm'>general</a></dd>" +
                     "        <dd><a href='" + prefix + "cv.htm'>CV</a></dd>" +
                     "        <dd><a href='" + prefix + "NZ03/nz_index.htm'>nz 2002 - 3</a></dd>" +
                     "        <dt>education & learning</dt>" +
                     "        <dd><a href='" + prefix + "ou.htm'>the ou</a></dd>" +
                     "        <dd><a href='" + prefix + "udacity.htm'>udacity</a></dd>" +
                     "        <dd><a href='" + prefix + "android.htm'>android development</a></dd>" +
                     "    </dl>" +
                     "</div>" + 
                     "<!--[if lte IE 6]</td></tr></table></a><![endif]-->" +
                "</li>");
    d.write("    <li class='parent" + interests + "'><a href='" + prefix + "interests.htm'>interests<!--[if gte IE 7]><!--></a><!--</a><!--<![endif]-->" +
                     "<!--[if lte IE 6]<table><tr><td><![endif]-->" +
                     "<div>" +
                     "    <dl>" +
                     "        <dt>i guess these are classed as &lsquo;fun&rsquo; :o)</dt>" +
                     "        <dd><a href='" + prefix + "interests.htm'>&lt;top&gt;</a></dd>" +
                     "        <dd><a href='" + prefix + "interests.htm#ringing'>bell ringing</a></dd>" +
                     "        <dd><a href='" + prefix + "interests.htm#trains'>steam trains</a></dd>" +
                     "        <dd><a href='" + prefix + "interests.htm#other'>other</a></dd>" +
                     "        <dd><a href='" + prefix + "photos.htm'>site photos credits</a></dd>" +
                     "    </dl>" +
                     "</div>" +
                     "<!--[if lte IE 6]</td></tr></table></a><![endif]-->" +
                "</li>");
    d.write("    <li class='parent" + work + "'><a href='" + prefix + "work.htm'>work<!--[if gte IE 7]><!--></a><!--</a><!--<![endif]-->" +
                     "<!--[if lte IE 6]<table><tr><td><![endif]-->" +
                     "<div>" +
                     "    <dl>" +
                     "        <dt>a quick outline of my activities at work</dt>" +
                     "        <dd><a href='" + prefix + "work.htm'>about</a></dd>" +
                     "    </dl>" +
                     "</div>" +
                     "<!--[if lte IE 6]</td></tr></table></a><![endif]-->" +
                "</li>");
    d.write("    <li class='parent" + fun + "'><a href='" + prefix + "fun.htm'>just4fun<!--[if gte IE 7]><!--></a><!--</a><!--<![endif]-->" +
                     "<!--[if lte IE 6]<table><tr><td><![endif]-->" +
                     "<div>" +
                     "    <dl>" +
                     "        <dt>html 5 - CHROME ONLY</dt>" +
    //                     "        <dd><a href='" + prefix + "HTML5/home.htm' target='_blank'>jo&lsquo;s SHINY site</a></dd>" +
                     "        <dd><a href='" + prefix + "HTML5/Shiny/SolarSystem/SolarSystem.htm' target='_blank'>solar system</a></dd>" +
                     "        <dd><a href='" + prefix + "HTML5/2048/Game2048.html' target='_blank'>2048 game</a></dd>" +
                     "        <dd><a href='" + prefix + "HTML5/Chaos/MandelBrot1.html' target='_blank'>Mandelbrot Set</a></dd>" +
                     "        <dd><a href='" + prefix + "HTML5/Chaos/LSystems.html' target='_blank'>L-Systems</a></dd>" +
                     "        <dd><a href='" + prefix + "HTML5/Creative/Experiments.html' target='_blank'>wavy lines</a></dd>" +
                     "        <dd><a href='" + prefix + "HTML5/Particles/Particles.html' target='_blank'>particles</a></dd>" +
                     "        <dd><a href='" + prefix + "http://woozlesreversi.azurewebsites.net/Game/Play' target='_blank'>othello (2p game)</a></dd>" +
//                     "        <dt>historical</dt>" +
//                     "        <dd><a href='" + prefix + "battleringers/index.htm' target='_blank'>battle ringers 2002</a></dd>" +
                     "    </dl>" +
                     "</div>" +
                     "<!--[if lte IE 6]</td></tr></table></a><![endif]-->" +
                "</li>");
    d.write("</ul>");

}

function Footer() {
    var dt = new Date();
    var d = document;
    d.write("Designed and built by Jo Faircloth.  All rights reserved.  &copy;" + dt.getFullYear());
}


var tmrClockId;

function fnLoad() {
    // set the clock, then set a timer for it...
    fnClock();

    // coz we're using free hosting, and it pops up little windows - ensure main window is focused, and we're not in a frame
    if (top.location != self.location) top.location = self.location;
    window.focus();  // might not always work - but hey, if you don't try...

}

function fnUnload() {
    clearTimeout(tmrClockId);
}

function fnClock() {
    var d = new Date();

    var tbx = document.getElementById("lblClock");
    if (tbx) {
        //var time = '%02d:%02d:%02d'.sprintf(d.getHours(), d.getMinutes(), d.getSeconds());
        var date = GetDate(d.getDate()) + " " + GetMonth(d.getMonth()) + " " + d.getFullYear();
        var time = PrefixNumber(d.getHours()) + ":" + PrefixNumber(d.getMinutes());
        var fuzzy = FuzzyTime(time);
        tbx.innerHTML = date + "<br />" + time + "<br />" + fuzzy;
    }

    tmrClockId = setTimeout(fnClock, 10000);
}

function PrefixNumber(num) {
    if (num == parseInt(num)) {
        if (num < 10) {
            num = "0" + num;
        }
    }
    return num;
}
function GetDate(date) {
    switch (date) {
        case 1:
        case 21:
        case 31:
            date = date + "st";
            break;
        case 2:
        case 22:
            date = date + "nd";
            break;
        case 3:
        case 23:
            date = date + "rd";
            break;
        default:
            date = date + "th";
            break;
    }
    return date;
}
function GetMonth(idx) {
    var mnths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    return mnths[idx];
}
function FuzzyTime(time) {
    var splt = time.split(":");
    if (splt.length == 2) {
        var hr = parseInt(splt[0]);
        var min = parseInt(splt[1]);
        var fuz = "";

        if (hr >= 0 && hr <= 5)
            fuz = "bedtime";
        else if (hr > 5 && hr <= 8)
            fuz = "early-ish";
        else if (hr >= 9 && hr <= 11)
            fuz = "morning";
        else if (hr >= 12 && hr <= 13)
            fuz = "lunchtime";
        else if (hr >= 14 && hr <= 19)
            fuz = "afternoon";
        else if (hr >= 20 && hr <= 21)
            fuz = "evening";
        else if (hr >= 22 && hr <= 23)
            fuz = "late-ish";
        else
            fuz = "";
    }
    return "[" + fuz + "]";
}

//if ( ! String.prototype.sprintf ) {    
///**   
//* sprintf(format, argument_list)   
//* 
//* The string function like one in C/C++, PHP, Perl  
//* Each conversion specification is defined as below:   
//*   
//* %[index][alignment][padding][width][precision]type   
//*   
//* index        An optional index specifier that changes the order of the    
//*              arguments in the list to be displayed.   
//* alignment    An optional alignment specifier that says if the result should be    
//*              left-justified or right-justified. The default is    
//*              right-justified; a "-" character here will make it left-justified.   
//* padding      An optional padding specifier that says what character will be    
//*              used for padding the results to the right string size. This may    
//*              be a space character or a "0" (zero character). The default is to    
//*              pad with spaces. An alternate padding character can be specified    
//*              by prefixing it with a single quote ('). See the examples below.   
//* width        An optional number, a width specifier that says how many    
//*              characters (minimum) this conversion should result in.   
//* precision    An optional precision specifier that says how many decimal digits    
//*              should be displayed for floating-point numbers. This option has    
//*              no effect for other types than float.   
//* type         A type specifier that says what type the argument data should be    
//*              treated as. Possible types:   
//*   
//* % - a literal percent character. No argument is required.     
//* b - the argument is treated as an integer, and presented as a binary number.   
//* c - the argument is treated as an integer, and presented as the character    
//*      with that ASCII value.   
//* d - the argument is treated as an integer, and presented as a decimal number.   
//* u - the same as "d".   * f - the argument is treated as a float, and presented as a floating-point.   
//* o - the argument is treated as an integer, and presented as an octal number.   
//* s - the argument is treated as and presented as a string.   
//* x - the argument is treated as an integer and presented as a hexadecimal    
//*       number (with lowercase letters).   
//* X - the argument is treated as an integer and presented as a hexadecimal    
//*       number (with uppercase letters).   
//*/  
//String.prototype.sprintf = function()  {          
//    var args = arguments;          
//    var index = 0;            
//    var x;          
//    var ins;          
//    var fn;            
//    /*           
//    * The callback function accepts the following properties           
//    *      x.index contains the substring position found at the origin string           
//    *      x[0] contains the found substring           
//    *      x[1] contains the index specifier (as \d+\$ or \d+#)           
//    *      x[2] contains the alignment specifier ("+" or "-" or empty)           
//    *      x[3] contains the padding specifier (space char, "0" or defined as '.)           
//    *      x[4] contains the width specifier (as \d*)           
//    *      x[5] contains the floating-point precision specifier (as \.\d*)           
//    *      x[6] contains the type specifier (as [bcdfosuxX])           
//    */          
//    return this.replace(String.prototype.sprintf.re, function() {
//        if ( arguments[0] == "%%" ) {
//            return "%";
//        }

//        x = [];
//        for (var i = 0; i < arguments.length; i++) {
//            x[i] = arguments[i] === undefined ? "" : arguments[i];
//        }

//        //              index++;
//        ins = (x[1]) ? args[x[1].substring(0, x[1].length - 1) - 1] : args[index];
//        index++;

//        switch (x[6]) {
//            case "b":
//                //                      ins = Number(ins).bin();
//                ins = Number(ins);
//                fn = Number.prototype.bin;
//                break;
//            case "c":
//                ins = String.fromCharCode(ins);
//                fn = String.prototype.padding;
//                break;
//            case "d":
//            case "u":
//                //                      ins = Number(ins).dec();
//                ins = Number(ins);
//                fn = Number.prototype.dec;
//                break;
//            case "f":
//                ins = Number(ins);
//                fn = String.prototype.padding;
//                if (x[5]) {
//                    ins = ins.toFixed(x[5].substr(1));
//                }
//                else if (x[4]) {
//                    ins = ins.toExponential(x[4]);
//                }
//                else {
//                    ins = ins.toExponential();
//                }
//                // Invert sign because this is not number but string
//                x[2] = x[2] == "-" ? "+" : "-";
//                break;
//            case "o":
//                //                      ins = Number(ins).oct();
//                ins = Number(ins);
//                fn = Number.prototype.oct;
//                break;
//            case "s":
//                ins = String(ins);
//                fn = String.prototype.padding;
//                break;
//            case "x":
//                //                      ins = Number(ins).hexl();
//                ins = Number(ins);
//                fn = Number.prototype.hexl;
//                break;
//            case "X":
//                //                      ins = Number(ins).hex();
//                ins = Number(ins);
//                fn = Number.prototype.hex;
//                break;  
//        }

//        return fn.call(ins, x[2] + x[4], x[3].substr(x[3].length - 1) || " ");
//    
//    });
//};

//String.prototype.sprintf.re = /%%|%(\d+[\$#])?([+-])?('.|0| )?(\d*)(\.\d*)?([bcdfosuxX])/g;
