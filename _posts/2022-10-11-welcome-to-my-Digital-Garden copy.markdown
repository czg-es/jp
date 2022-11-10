---
layout: post
title:  "Welcome to my digital garden!"
date:   2022-11-01 14:00:40 +0200
categories: misc
---

I recently learned about digital gardens, a concept that fascinated me. This is my humble attempt to grow one.

The page its done in jekyll, modifying the default minima theme.<br>Tweaking the layouts, fiddling a bit with the liquid templating, adding some javascript and css here an there... <br>You know the drill, once you start to change a couple of things its hard to stop.<br>
There are some posts migrated from a previous blog written in spanish, but from now on I´ll be writting in english.



<!--excerpt.start-->

<style>
    input[type="color"] {
            -webkit-appearance: none;
    border: none;
    width: 5rem;
    /* height: 5rem; */
    border-radius: 5%;
    /* padding: 0;*/
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        border: none;border-radius: 5%;
    }
    input[type="color"]::-webkit-color-swatch {
        border: 2px solid var(--text);
        border-radius: 5%;
    }
    .controls > div{
        padding:0.5rem;
        border:1px solid var(--accent);
        background:var(--bg);
        margin: 0.5rem; 
        text-align: center; 
        border-radius:5%;
        filter: drop-shadow(2px 4px 5px var(--shadow));
        color: var(--text);
    }
/* COLOR CHANGE WIDGET----------------------------------------------------------------------------------------------- */
    .controls{
        padding: 1rem;
        display: flex;
        flex-direction: row;
    /*     display: flex;
        flex-direction: row;
        align-items: center; */
        //justify-content: space-evenly;
    }   

    @media (max-width: 400px), (orientation: portrait){
        .controls {
            flex-direction: column;
            padding: 0.5rem;
        }
        .controls > div{
            padding:0.5rem; 
            max-width: 250px;   
        }
    }

</style>

While you are here feel free to experiment with the colors. 
I hope you enjoy your stay.
<div class="controls">
    <div>
        <label for="cPick1">BACKGROUND</label><br>
        <input type="color" id="cPick1" name="cPick1" class="colorpick" onchange="setBg(this.value)">
    </div>
    <div>
        <label for="cPick2">ACCENT</label><br>
        <input type="color" id="cPick2" name="cPick2"  class="colorpick" onchange="setAccent(this.value)">
    </div>
    <div>
        <label for="cPick3">TEXT</label><br>
        <input type="color" id="cPick3" name="cPick3"  class="colorpick" onchange="setTextColor(this.value)">
    </div>
</div>

<script>


function getColors(){
        document.getElementById('cPick1').value = getComputedStyle(document.documentElement).getPropertyValue('--bg');
        document.getElementById('cPick2').value = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        document.getElementById('cPick3').value = getComputedStyle(document.documentElement).getPropertyValue('--text');

    }
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    getColors();
});
</script>

<!--excerpt.end-->


