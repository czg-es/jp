/* THEME STUFF-------------------------------------------- */
let bg = getComputedStyle(document.documentElement).getPropertyValue('--bg');
let accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
let text = getComputedStyle(document.documentElement).getPropertyValue('--text');

let current_bg = ""
let current_accent = ""
let current_textColor = ""
let current_mode = ""


/* COLOR POOLS */
const bgs = ['#36001b', '#2C3639', '#16213E', '#1B2430', '#26042c', '#191A19', '#010038']
/* const bgs =['#ff0000','#008000','#0000ff','#ffff00','#ffc0cb','#800080','#ffa500'] */
const accents = ['#d2691e', '#A27B5C', '#E94560', '#816797', '#D49B54', '#FFD717', '#F39422']
const textColors = ['#faebd7', '#f0f8ff', '#f5deb3', '#fff8dc', '#fff0f5', '#f5f5f5']

let currentSettings = window.name

/* ------MAIN LOGIC LOOP----------------------------------------------------------------- */
if (!currentSettings) {
    console.log('first time huh?')
    current_mode = "night"
    setBg()
    console.log(currentSettings)
    setAccent()
    console.log(currentSettings)
    setTextColor()
    console.log(currentSettings)

    current_bg = window.name.split(',')[0]
    current_accent = window.name.split(',')[1]
    current_textColor = window.name.split(',')[2]
    current_mode = window.name.split(',')[3]
    
    console.log(' 1st time RESULTING: ')
    console.log (window.name)
    console.log(currentSettings)
    
    window.name = [
        getComputedStyle(document.documentElement).getPropertyValue('--bg'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent'),
        getComputedStyle(document.documentElement).getPropertyValue('--text'),
        current_mode]
    
    
    

} else {

    console.log('hay currentSettings / window.name')
    console.log(currentSettings)
    console.log(window.name)

    current_bg = window.name.split(',')[0]
    current_accent = window.name.split(',')[1]
    current_textColor = window.name.split(',')[2]
    current_mode = window.name.split(',')[3]
    //console.log(current_mode)

    if (current_mode == 'day') {
        invert()
        invert()  /* why twice though????? */
    }

    setBg(current_bg)
    setAccent(current_accent)
    setTextColor(current_textColor)
    /*
    window.name = [
        getComputedStyle(document.documentElement).getPropertyValue('--bg'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent'),
        getComputedStyle(document.documentElement).getPropertyValue('--text'),
        current_mode]
        */
    
    console.log(' other time RESULTING: ')
    console.log (window.name)
    console.log(currentSettings)
    
    /* FAIL SAFE*/
    if(window.name.split(',')[0] == 'night'){
     console.log('IT HAPPENED');
     refresh();
    }

}

/* setter funcs for dom elements ------------------------------------------------------------------------------------------------------ */

function setBg(color) {
    if (!color) {
        color = bgs[Math.floor(Math.random() * bgs.length)];
    }

    document.documentElement.style.setProperty('--bg', color);
    bg = color
    window.name = [color, accent, text, current_mode]
    currentSettings = window.name
    console.log(window.name)
}

function setAccent(color) {
    if (!color) {
        color = accents[Math.floor(Math.random() * accents.length)];
    }

    document.documentElement.style.setProperty('--accent', color);
    accent = color
    window.name = [bg, color, text, current_mode]
    currentSettings = window.name
    console.log(window.name)
}

function setTextColor(color) {
    if (!color) {
        color = textColors[Math.floor(Math.random() * textColors.length)];
    }

    document.documentElement.style.setProperty('--text', color);
    text = color
    window.name = [bg, accent, color, current_mode]
    currentSettings = window.name
    console.log(window.name)
}

/* reloads the page but saving mode to window.name */
function refresh() {
    //console.log('--------------------------');
    //console.log(current_mode);
    //console.log('----------------');
        //window.name = ",,," + current_mode;
        window.name = ['','','', current_mode];
    //window.name = [bg, accent, text, current_mode]
    window.location.reload();
    //se('hero_wrapper');
}

/* for elements not to invert when changind day/night mode */
function invertElByTag(un_invert, tag) {
    let images = document.getElementsByTagName(tag)
    let arr1 = [].slice.call(images);
    arr1.forEach(e => {
        ////console.log(e)
        if (!un_invert) {
            e.style.setProperty('filter', 'invert(1) hue-rotate(180deg)');
        } else {
            e.style.setProperty('filter', '');
        }
    })

}

/* TOGGLES DAY/NUGHT MODE-------------------------------------------------- */
function invert() {
    btn = document.getElementById('emoji');
    btn.textContent = '🌙';

    let elem = document.getElementsByTagName('html')[0];

    if (!current_mode || current_mode == "night") {
        //console.log('inverting from night')
        /* document.getElementsByTagName('html')[0].style.setProperty('filter', 'invert(1) hue-rotate(91deg)'); */
        document.getElementsByTagName('html')[0].style.setProperty('filter', 'invert(1) hue-rotate(180deg)');
        
        window.name = [bg, accent, text, 'day']
        currentSettings = window.name

        //console.log(current_mode)
        //console.log('from invert !current_mode || current_mode == "night"')
        current_mode = "day"


        btn.textContent = '☀️';
        btn.style.setProperty('filter', 'hue-rotate(180deg) invert(1)');

        document.documentElement.style.setProperty('--shadow', '#ffffffb2');

        try {
            //document.getElementById('svg_face').style.setProperty('filter', 'invert(1) hue-rotate(180deg)');
            document.getElementById('svgFoto').style.setProperty('filter', 'invert(1) hue-rotate(180deg)');

        } catch (error) {
            //console.log('we are not in about page')
        }
        try {
            invertElByTag(0, 'img')
            invertElByTag(0, 'iframe')
        } catch (error) {
            //console.log('no images in this page')
        }


    }
    else {
        document.getElementsByTagName('html')[0].style.setProperty('filter', 'hue-rotate(0deg)');
        //console.log('inverting from day')

        window.name = [bg, accent, text, 'night']
        currentSettings = window.name

        current_mode = "night"
        //console.log(current_mode)
        //console.log('from invert else')


        btn.textContent = '🌙';
        btn.style.setProperty('filter', '');

        document.documentElement.style.setProperty('--shadow', '#000000b2');

        try {
            //document.getElementById('svg_face').style.setProperty('filter', 'hue-rotate(0deg)');
            document.getElementById('svgFoto').style.setProperty('filter', 'hue-rotate(0deg)');

        } catch (error) {
            //console.log('we are not in about page')

        }
        try {
            invertElByTag(1, 'img')
            invertElByTag(1, 'iframe')
        } catch (error) {
            //console.log('no images in this page')
        }


    }
    /* elem.style.cssText += 'filter: invert(1);'; */
    /* elem.style.cssText += 'filter: invert(1) hue-rotate(91deg);'; */
}


/* AUX stuff */

function invertHex(hex) {
    hex = hex.split("#")[1]
    return "#" + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

/* HERO STUFFFFF -----------------------------------------------------------------*/
/* Letter shadow animation */
try {
    //CHECK THIS TWO-----------------------------------------
    getComputedStyle(document.getElementsByClassName("Cshadow")[0],)['animation']

    getComputedStyle(document.getElementsByClassName("Cshadow")[0],)['fill']

    let c_shadows = document.getElementsByClassName("Cshadow");
    let z_shadows = document.getElementsByClassName("Zshadow");
    let g_shadows = document.getElementsByClassName("Gshadow");


    let arr1 = [].slice.call(z_shadows);
    let arr2 = [].slice.call(c_shadows);
    let arr3 = [].slice.call(g_shadows);
    let arr = arr1.concat(arr2, arr3);


    let randoFill = Math.floor(Math.random() * 5) + 1;

    arr.forEach(e => {
        ////console.log(e)
        e.style.setProperty('animation', `fill-reveal-${randoFill} 10s ease forwards`);
    })

} catch (error) {
    console.error(error);
}


/* BACKGROUND STUFF */

const bgPatterns = ['puzle', '_wall', 'paperwall', 'triangles', 'xs', 'square_paper', 'triangles-2', 'squares', 'squares-2',
    'circle-grid', 'hexagons', 'hexagons-2', 'peak-lines', 'mosaic', 'stamps',
    'sewer', 'circle-geometry', 'bamboo', 'bamboo-2', 'brickwall', 'clouds', 'texture']

const heroBgPatterns = ['puzle', 'brickwall', 'mosaic', 'triangles', 'xs', 'square_paper', 'triangles-2', 'squares', 'hexagons',
    'sewer', 'bamboo-2', 'clouds', 'texture', 'topology']


function se(elementClass, position) {
    /* The list that feeds this function is different: heroBgPatterns-- */
    let element = document.getElementsByClassName(elementClass)[0]
    if (!position) {
        position = Math.floor(Math.random() * heroBgPatterns.length);
    }

    let classList = element.classList
    let classes = [].slice.call(classList);
    let lastClass = classes.length > 1 ? classes[classes.length - 1] : 'uy'

    //let lastClass = classes[classes.length-1]

    //console.log(lastClass)
    let selectedBg = heroBgPatterns[position]
    ////console.log(selectedBg)
    if (classes[classes.length - 2] == "move_it") {
        //console.log('pasó')
        element.classList.toggle('translate');
        element.classList.toggle('move_it');
    }
    element.classList.toggle('translate');
    element.classList.toggle('move_it');
    element.classList.toggle(lastClass);
    element.classList.toggle(selectedBg);
}

function seMulti(elementClass, position) {
    /* The list that feeds this function is different: heroBgPatterns-- */
    let elements = document.getElementsByClassName(elementClass)
    if (!position) {
        position = Math.floor(Math.random() * heroBgPatterns.length);
    }
    let elArr = [].slice.call(elements);

    elArr.forEach(element => {

        let classList = element.classList
        let classes = [].slice.call(classList);
        let lastClass = classes.length > 1 ? classes[classes.length - 1] : 'uy'

        //let lastClass = classes[classes.length-1]

        //console.log(lastClass)
        let selectedBg = heroBgPatterns[position]
        ////console.log(selectedBg)
        if (classes[classes.length - 2] == "move_it") {
            //console.log('pasó')
            element.classList.toggle('translate');
            element.classList.toggle('move_it');
        }
        element.classList.toggle('translate');
        element.classList.toggle('move_it');
        element.classList.toggle(lastClass);
        element.classList.toggle(selectedBg);
        element.style.setProperty('background-attachment', 'scroll !important');

    })

}

function change_bg_pattern(pattern) {
    try {
        se('head_card', pattern)
        seMulti('spacer')
        //setElementBg2('spacer')

    } catch (error) {
        se('hero_wrapper', pattern)
        seMulti('spacer')
        //setElementBg2('spacer')
    }
}



function setElementBg(elementClass, position) {

    let element = document.getElementsByClassName(elementClass)[0]
    if (!position) {
        position = Math.floor(Math.random() * heroBgPatterns.length);
    }
    let selectedBg = heroBgPatterns[position]
    ////console.log(selectedBg)
    element.classList.toggle(selectedBg);
}

function setElementBg2(elementClass, position) {

    let element = document.getElementsByClassName(elementClass)
    let elements = [].slice.call(element);

    ////console.log(element)

    if (!position) {
        position = Math.floor(Math.random() * bgPatterns.length);
    }
    let selectedBg = bgPatterns[position]
    ////console.log(selectedBg)

    //console.log(position)
    //console.log('position-------------------------------')

    elements.forEach(e => {
        //position = Math.floor(Math.random()* bgPatterns.length) ;
        //selectedBg = bgPatterns[position];
        ////console.log(e)
        e.classList.toggle(selectedBg);
    })
}

try {
    setElementBg('head_card');
    //se('head_card')
    //se('head_card')
} catch (error) {
    //console.error(error);
}


try {
    setElementBg('hero_wrapper');
    //se('hero_wrapper');
    //se('hero_wrapper');
} catch (error) {
    //console.error(error);

}


setElementBg2('page-content', 21);
setElementBg2('site-footer');
setElementBg2('spacer');

/* Hide navbar on scroll */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("site-header").style.top = "0";
    //document.getElementById("site-header").style.transform = "translateY(0)";
  } else {
    document.getElementById("site-header").style.top = "-60px";
    //document.getElementById("site-header").style.transform = "translateY(-60px)";
  }
  prevScrollpos = currentScrollPos;
}

window.setTimeout(function () {invert(); invert(); }, 200);
window.name = currentSettings;
