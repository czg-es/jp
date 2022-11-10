---
layout: post
title:  "Analisis de archivos .nml "
date:   2021-06-16 22:22:22 +0200
categories: data_manipulation python
---
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
<style>

.highlight{
  max-height: 60vh;
  /*overflow: scroll;*/

}
.dataframe thead th {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
    text-align: right;
    background: var(--bg);
    color: #000000;
    position: sticky;
    top: 0;
}
.wrapper_{
  height: 60vh;
  overflow: scroll;
}
.dataframe{
    font-family: 'Poppins', sans-serif;
    /*font-size: 1.5em !important;*/
    }

</style>



<!--excerpt.start-->
# Extracción de datos de archivo .nml
El popular programa para DJing traktor archiva información de las canciones que añadimos a la colección
en un archivo con extensión .nml, a primera vista tiene la estructura de un archivo xml.
con nodos,etiquetas y atributos. A continuación, en un jupyter notebook con un kernel Python 3, extraeremos la información y manejaremos los datos para poder presentarlos de una manera adecuada.
El objetivo es poder crear una web app que nos permita consultar rápidamente este conjunto de datos.
<!--excerpt.end-->
# ENTORNO


```python
import pandas as pd 
import xml.etree.ElementTree as etree
```


```python
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', 500)
pd.set_option('display.max_colwidth', 10000)
```

# Cargar la coleccion


```python
tree = etree.parse("collection.nml", etree.XMLParser(encoding='ISO-8859-1'))
root = tree.getroot()
```

# Estructura del archivo .nml

El archivo está estructurado como un archivo .xml, está compuesto de una serie de nodos, los cuales tienen etiquetas que los definen y attributos.




```python
for i in root:
    print(i)
```

    <Element 'HEAD' at 0x000001E90D2F5900>
    <Element 'MUSICFOLDERS' at 0x000001E90D2F5950>
    <Element 'COLLECTION' at 0x000001E90D2F59A0>
    <Element 'SETS' at 0x000001E913594590>
    <Element 'PLAYLISTS' at 0x000001E91359F590>
    <Element 'SORTING_ORDER' at 0x000001E913912590>
    <Element 'SORTING_ORDER' at 0x000001E913912680>
    <Element 'SORTING_ORDER' at 0x000001E913912720>
    <Element 'SORTING_ORDER' at 0x000001E9139127C0>
    <Element 'SORTING_ORDER' at 0x000001E913912860>
    <Element 'SORTING_ORDER' at 0x000001E913912900>
    <Element 'SORTING_ORDER' at 0x000001E9139129A0>
    <Element 'SORTING_ORDER' at 0x000001E9139129F0>
    <Element 'SORTING_ORDER' at 0x000001E913912A40>
    <Element 'SORTING_ORDER' at 0x000001E913912A90>
    <Element 'SORTING_ORDER' at 0x000001E913912B30>
    <Element 'SORTING_ORDER' at 0x000001E913912B80>
    <Element 'SORTING_ORDER' at 0x000001E913912BD0>
    <Element 'SORTING_ORDER' at 0x000001E913912CC0>
    <Element 'SORTING_ORDER' at 0x000001E913912D10>
    <Element 'SORTING_ORDER' at 0x000001E913912DB0>
    

## Elemento COLLECTION
El nodo o elemento que nos interesa es COLLECTION es donde está almacenada 
la información que el programa guarda de cada una de las canciones que componen la colección.



```python
collection = root[2]
```

## Estructura del elemento ENTRY
El elemento COLLECTION esta formado de elementos ENTRY uno por cancion en nuestra colección.
Cada elemento entry cuenta con un máximo de 8 elementos, podemos llegar a esta conclusión observando el contenido del archivo y a base de ensallo y error al tratar de leer etiquetas y atributos.<br>
En xml.etree podemos usar <b>element.tag</b> para leer las etiquetas y <b>element.attrib</b> para los atributos.




```python
print(str(collection[2404].attrib)+"\n-----------------------|||||||||||------------------------------------------------")
for i in range(0,8):
    print(collection[2404][i].tag)
    print(collection[2404][i].attrib)
```

    {'MODIFIED_DATE': '2009/4/17', 'MODIFIED_TIME': '34028', 'AUDIO_ID': 'AiIAABESMRE0MiIzIjNZeJl2d1mIu7y6qIqrpBEjb////////////////////////////////Z///////////////+bf//////////////+IUyRo///////////////8T////////////////////////////////4////////50REVkIkOf///////////////////////+7///////91MRIRERKENmO3MlRZdVVWd2VXdmZ3eJvv//////////////////////////////////////////////////90V3n////////////////////////8dUQzMiIiMRAAAAAA==', 'TITLE': 'Ghost In The Machine (U-Recken', 'ARTIST': 'Xerox & Illumination'}
    -----------------------|||||||||||------------------------------------------------
    LOCATION
    {'DIR': '/:music/:psychedelik-----------/:FULL ON------------/:Xerox_And_Illumination_-PE/:', 'FILE': '04-xerox_and_illumination_-_ghost_in_the_machine_u-recken_rmx-upe.mp3', 'VOLUME': 'G:', 'VOLUMEID': '14697cae'}
    ALBUM
    {'TRACK': '4', 'TITLE': 'RMX'}
    MODIFICATION_INFO
    {'AUTHOR_TYPE': 'user'}
    INFO
    {'BITRATE': '206000', 'GENRE': 'Psychedelic', 'PLAYTIME': '546', 'PLAYTIME_FLOAT': '545.672', 'RANKING': '255', 'IMPORT_DATE': '2013/12/14', 'RELEASE_DATE': '2009/1/1', 'FLAGS': '14', 'FILESIZE': '13814'}
    TEMPO
    {'BPM': '142', 'BPM_QUALITY': '100'}
    LOUDNESS
    {'PEAK_DB': '-1.60804', 'PERCEIVED_DB': '-0.17109', 'ANALYZED_DB': '-0.17109'}
    MUSICAL_KEY
    {'VALUE': '7'}
    CUE_V2
    {'NAME': 'AutoGrid', 'DISPL_ORDER': '0', 'TYPE': '4', 'START': '143.184', 'LEN': '0', 'REPEATS': '-1', 'HOTCUE': '0'}
    
ENTRY : ARTIST , TITLE

0-LOCATION:  FILE <br>
1-ALBUM: TRACK <br>
2-MODIFICATION_INFO:--------------------------- <br>
3-INFO: BITRATE , KEY , PLAYTIME, IMPORT_DATE<br>
4-TEMPO: BPM<br>
5-LOUDNESS:------------------------------------<br>
6-MUSICAL_KEY: VALUE<br>
7-CUE_V2:--------------------------------------<br>



### Función para leer atributos

Una función que aplicaremos contra cada atributo de cada canción.
es importante capturar las excepciones (errores) para que no terminen la ejecución y el programa pueda seguir procesando otros atributos.
Se van a producir estos errores al intentar leer algún atributo o etiqueta ya que no todos los elementos cuentan con todas la etiquetas.




```python
def asigna(elem,att):
    try:
        ppt = elem.attrib[att]
    except:
        ppt = "NONE_"+att
    return ppt
        
```


```python
counter = 0
details =[]
info = []
row = []
todo = []
for track in collection:  #[0:100]:
    title =  asigna(track,'TITLE')
    artist = asigna(track,'ARTIST')
    details.append(track.attrib.items()) # obtiene un diccionario 
    
    album = "NADA"
    no_track = "NADA"
    key_value = "NADA"
    genre = "NADA"
    import_date ="NADA"
    release_date = "NADA"
    ranking = "nada"
    playcount = "nada"
    playtime = "nada"
    clave = "nada"
    tempo = "nada"
    key_value = "nada"
    
    counter += 1
    for element in track:
        if element.tag == 'LOCATION':
            try:
                directory =  asigna(element,'DIR')
                arch = asigna(element,'FILE')
            except:
                print('nope LOC')
        if element.tag == 'ALBUM':
            try:
                album =  asigna(element,'TITLE')
                no_track = asigna(element,'TRACK')
            except:
                print('nope ALBUM')
        if element.tag == 'INFO':
            try:
                genre = asigna(element,'GENRE')
                import_date = asigna(element,'IMPORT_DATE')
                release_date = asigna(element,'RELEASE_DATE')
                ranking = asigna(element,'RANKING')
                playcount = asigna(element,'PLAYCOUNT')
                playtime = asigna(element,'PLAYTIME')
                clave = asigna(element,'KEY')
            except:
                print('nope INFO')
        if element.tag == 'TEMPO':
            try:
                tempo = asigna(element,'BPM')
            except:
                print('nope TEMPO')
        if element.tag == 'MUSICAL_KEY':
            try:
                key_value = asigna(element,'VALUE')
            except:
                print('nope KEY')
    todo.append((title,artist,directory,arch,album,no_track,genre,import_date,release_date,ranking,playcount,playtime,clave,tempo,key_value))

```

## Entradas procesadas


```python
counter
```




    16433




```python
todo[1001:1008]
```




    [('Tokyo Tea (Ticon Remix)',
      'FM Radio Gods',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:Ticon-I_Love_You_Who_Are_You-2CD-2011/:Ticon-I_Love_You_Who_Are_You-2CD-2011/:',
      '209-fm_radio_gods-tokyo_tea_(ticon_remix)-pillirumpan.mp3',
      'I Love You, Who Are You?',
      '9',
      'Trance',
      '2012/1/6',
      '2011/1/1',
      '255',
      '3',
      '482',
      'Gbm',
      '128',
      '18'),
     ('Who Cares',
      'Phaxe',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:VA - Get It (2012)/:',
      '01. Phaxe - Who Cares.mp3',
      'Get It',
      '1',
      'NONE_GENRE',
      '2012/7/15',
      '2012/1/1',
      'NONE_RANKING',
      '13',
      '406',
      'Em',
      '136',
      '16'),
     ('Sexy Dance (Symphonix rmx)',
      'Symphonix',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:VA - Get It (2012)/:',
      '02. Symphonix - Sexy Dance (Symphonix rmx).mp3',
      'Get It',
      '2',
      'NONE_GENRE',
      '2012/7/15',
      '2012/1/1',
      'NONE_RANKING',
      '1',
      '418',
      'Am ',
      '135.999',
      '9'),
     ('Paradise',
      'Osher',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:VA - Get It (2012)/:',
      '03. Osher - Paradise.mp3',
      'Get It',
      '3',
      'NONE_GENRE',
      '2012/7/15',
      '2012/1/1',
      'NONE_RANKING',
      '4',
      '482',
      'E  ',
      '137',
      '16'),
     ('Experimental Game',
      'Symphonix',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:VA - Get It (2012)/:',
      '04. Symphonix - Experimental Game.mp3',
      'Get It',
      '4',
      'NONE_GENRE',
      '2012/7/15',
      '2012/1/1',
      'NONE_RANKING',
      '1',
      '377',
      'Gbm',
      '136',
      '18'),
     ('Roll and Rock',
      'Interactive Noise',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:VA - Get It (2012)/:',
      '05. Interactive Noise - Roll and Rock.mp3',
      'Get It',
      '5',
      'NONE_GENRE',
      '2012/7/15',
      '2012/1/1',
      'NONE_RANKING',
      '2',
      '394',
      'Gm ',
      '137',
      '19'),
     ('Inspired',
      'DJ Fabio and Moon',
      '/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:PROGRESSIVE/:VA - Get It (2012)/:',
      '06. DJ Fabio and Moon - Inspired.mp3',
      'Get It',
      '6',
      'NONE_GENRE',
      '2012/7/15',
      '2012/1/1',
      'NONE_RANKING',
      '1',
      '456',
      'Em ',
      '138',
      '4')]



# DATAFRAME


```python
df = pd.DataFrame(todo, columns=["title", "artist","directory","arch","album","no_track","genre","import_date","release_date","ranking","playcount","playtime","key_name","bpm","key"])
```


```python
df[500:600]
```




<div class="wrapper_">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>


<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>artist</th>
      <th>directory</th>
      <th>arch</th>
      <th>album</th>
      <th>no_track</th>
      <th>genre</th>
      <th>import_date</th>
      <th>release_date</th>
      <th>ranking</th>
      <th>playcount</th>
      <th>playtime</th>
      <th>key_name</th>
      <th>bpm</th>
      <th>key</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>500</th>
      <td>Bendamin (Original Mix)</td>
      <td>Wizzy Noise</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Wizzy_Noise_-_The_Retro_Is_Here_EP_2012/:</td>
      <td>01. Wizzy Noise - Bendamin (Original Mix).mp3</td>
      <td>The Retro Is Here - Single</td>
      <td>1</td>
      <td>Psychedelic</td>
      <td>2013/12/14</td>
      <td>2012/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>502</td>
      <td>Gbm</td>
      <td>143.953</td>
      <td>18</td>
    </tr>
    <tr>
      <th>501</th>
      <td>Color Space (Original Mix)</td>
      <td>Wizzy Noise</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Wizzy_Noise_-_The_Retro_Is_Here_EP_2012/:</td>
      <td>02 . Wizzy Noise - Color Space (Original Mix).mp3</td>
      <td>The Retro Is Here - Single</td>
      <td>2</td>
      <td>Psychedelic</td>
      <td>2013/12/14</td>
      <td>2012/1/1</td>
      <td>NONE_RANKING</td>
      <td>1</td>
      <td>474</td>
      <td>Bm</td>
      <td>135.997</td>
      <td>7</td>
    </tr>
    <tr>
      <th>502</th>
      <td>Spook (Wizzy Noise Remix)</td>
      <td>GMS</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Wizzy_Noise_-_The_Retro_Is_Here_EP_2012/:</td>
      <td>03. GMS - Spook (Wizzy Noise Remix).mp3</td>
      <td>The Retro Is Here - Single</td>
      <td>3</td>
      <td>Psychedelic</td>
      <td>2013/12/14</td>
      <td>2012/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>445</td>
      <td>Am</td>
      <td>139.998</td>
      <td>11</td>
    </tr>
    <tr>
      <th>503</th>
      <td>sokeism-psychedelic mix-10-12-2010</td>
      <td>mixed by Sokeism</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:</td>
      <td>10-12-2010_320kbps_Sokeism_on_psytrance_clean.mp3</td>
      <td>NONE_TITLE</td>
      <td>18</td>
      <td>Psychedelic</td>
      <td>2012/3/29</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>4085</td>
      <td>NONE_KEY</td>
      <td>148.004</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>504</th>
      <td>ambipure Rendered</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:</td>
      <td>ambipure Rendered.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>Other</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>4831</td>
      <td>NONE_KEY</td>
      <td>190</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>505</th>
      <td>01-Digital Talk vs. Para Halu- Frogs on Lufi</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>01-Digital Talk vs. Para Halu- Frogs on Lufi.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>330</td>
      <td>Abm</td>
      <td>147.994</td>
      <td>20</td>
    </tr>
    <tr>
      <th>506</th>
      <td>02-Penta- Gone with the wind</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>02-Penta- Gone with the wind.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>305</td>
      <td>Gm</td>
      <td>147.998</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>507</th>
      <td>03-The Nommos- Magma</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>03-The Nommos- Magma.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>84</td>
      <td>Gm</td>
      <td>148</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>508</th>
      <td>04-Metalaxys-Noise reduction(poliphonia rmx)</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>04-Metalaxys-Noise reduction(poliphonia rmx).mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>159</td>
      <td>Ebm</td>
      <td>147.998</td>
      <td>15</td>
    </tr>
    <tr>
      <th>509</th>
      <td>05-Para Halu-Neverending Story</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>05-Para Halu-Neverending Story.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>251</td>
      <td>Gm</td>
      <td>147.005</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>510</th>
      <td>06-Abnormal Project-Alice</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>06-Abnormal Project-Alice.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>169</td>
      <td>Abm</td>
      <td>147.996</td>
      <td>20</td>
    </tr>
    <tr>
      <th>511</th>
      <td>07-Furious- Shankar-</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>07-Furious- Shankar-.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>156</td>
      <td>Bm</td>
      <td>147.995</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>512</th>
      <td>08-Baphomet engine-No room</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>08-Baphomet engine-No room.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>130</td>
      <td>Ebm</td>
      <td>147.999</td>
      <td>15</td>
    </tr>
    <tr>
      <th>513</th>
      <td>09-Gregh on earth -Serpentine apotheosis</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>09-Gregh on earth -Serpentine apotheosis.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>78</td>
      <td>Ebm</td>
      <td>147.995</td>
      <td>15</td>
    </tr>
    <tr>
      <th>514</th>
      <td>10-Cosmo &amp; Naked tourist- Lets get mad-</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>10-Cosmo &amp; Naked tourist- Lets get mad-.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>128</td>
      <td>E</td>
      <td>147.994</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>515</th>
      <td>11-The Nommos -Nameless</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>11-The Nommos -Nameless.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>122</td>
      <td>Gbm</td>
      <td>149.994</td>
      <td>18</td>
    </tr>
    <tr>
      <th>516</th>
      <td>12-Kiriyama -Feuerschutz</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>12-Kiriyama -Feuerschutz.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>121</td>
      <td>F</td>
      <td>151.966</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>517</th>
      <td>13-Highko- level 25</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>13-Highko- level 25.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>124</td>
      <td>Em</td>
      <td>81.844</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>518</th>
      <td>14-Psykovsky &amp; Cosmo - So many Q</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>14-Psykovsky &amp; Cosmo - So many Q.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>157</td>
      <td>Bm</td>
      <td>152.003</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>519</th>
      <td>15-Jellyheadz - Kapitalist</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>15-Jellyheadz - Kapitalist.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>143</td>
      <td>Am</td>
      <td>151.999</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>520</th>
      <td>16-para halu- ------------</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>16-para halu- ------------.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>181</td>
      <td>Gbm</td>
      <td>152.001</td>
      <td>18</td>
    </tr>
    <tr>
      <th>521</th>
      <td>17-strezz vs. Kalilaskov-psy dorados</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>17-strezz vs. Kalilaskov-psy dorados.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>129</td>
      <td>Am</td>
      <td>147.998</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>522</th>
      <td>18-TrippyHippies-Fish soup</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>18-TrippyHippies-Fish soup.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>99</td>
      <td>Ebm</td>
      <td>147.005</td>
      <td>15</td>
    </tr>
    <tr>
      <th>523</th>
      <td>19-Penta-esta Noche</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>19-Penta-esta Noche.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>1</td>
      <td>136</td>
      <td>NONE_KEY</td>
      <td>148.005</td>
      <td>19</td>
    </tr>
    <tr>
      <th>524</th>
      <td>20-Nasca out of this world</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>20-Nasca out of this world.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>131</td>
      <td>Dbm</td>
      <td>148</td>
      <td>13</td>
    </tr>
    <tr>
      <th>525</th>
      <td>21-Para Halu -Twisted sunset</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>21-Para Halu -Twisted sunset.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>205</td>
      <td>Am</td>
      <td>150.01</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>526</th>
      <td>22-Samadhi - Film mutation</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>22-Samadhi - Film mutation.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>156</td>
      <td>Abm</td>
      <td>148.002</td>
      <td>20</td>
    </tr>
    <tr>
      <th>527</th>
      <td>23-Stranger vs. Fractal - Strangenoise</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>23-Stranger vs. Fractal - Strangenoise.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>196</td>
      <td>Ebm</td>
      <td>147.998</td>
      <td>15</td>
    </tr>
    <tr>
      <th>528</th>
      <td>24-Claw - Trauma kill</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>24-Claw - Trauma kill.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>147</td>
      <td>Dbm</td>
      <td>147.014</td>
      <td>13</td>
    </tr>
    <tr>
      <th>529</th>
      <td>25-Multi Evil- Scroll of evil</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>25-Multi Evil- Scroll of evil.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>184</td>
      <td>Bbm</td>
      <td>145.994</td>
      <td>22</td>
    </tr>
    <tr>
      <th>530</th>
      <td>26-Samadhi- Flash Back</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>26-Samadhi- Flash Back.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>159</td>
      <td>Abm</td>
      <td>144.997</td>
      <td>20</td>
    </tr>
    <tr>
      <th>531</th>
      <td>27-Fractal noise- Goa</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>27-Fractal noise- Goa.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>159</td>
      <td>Fm</td>
      <td>144.995</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>532</th>
      <td>28-Orestis vs Stranger - Alitia</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>28-Orestis vs Stranger - Alitia.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>125</td>
      <td>Gm</td>
      <td>147.997</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>533</th>
      <td>29-Parus- x-Bilet</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:dark/:</td>
      <td>29-Parus- x-Bilet.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>338</td>
      <td>Abm</td>
      <td>147.997</td>
      <td>20</td>
    </tr>
    <tr>
      <th>534</th>
      <td>01-Shulman- Retroscape</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>01-Shulman- Retroscape.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>315</td>
      <td>Dm</td>
      <td>130.002</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>535</th>
      <td>02-Tripswitch- Exiled (gaudi rmx)</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>02-Tripswitch- Exiled (gaudi rmx).mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>179</td>
      <td>Bm</td>
      <td>130.005</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>536</th>
      <td>03-Youngerbrother- Sleepwalker pt.2</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>03-Youngerbrother- Sleepwalker pt.2.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>232</td>
      <td>Bm</td>
      <td>75.03</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>537</th>
      <td>04-Chilled sequence- Lucid dream</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>04-Chilled sequence- Lucid dream.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>195</td>
      <td>D</td>
      <td>117.946</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>538</th>
      <td>05-Ott - Rolfcopter</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>05-Ott - Rolfcopter.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>327</td>
      <td>Bbm</td>
      <td>135</td>
      <td>22</td>
    </tr>
    <tr>
      <th>539</th>
      <td>06-Slackbaba - Sea of green</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>06-Slackbaba - Sea of green.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>297</td>
      <td>Gm</td>
      <td>99.721</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>540</th>
      <td>07-kuba -My snitchcomron</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>07-kuba -My snitchcomron.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>232</td>
      <td>Am</td>
      <td>115.995</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>541</th>
      <td>08-D.N.A. - Get Wicked</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>08-D.N.A. - Get Wicked.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>232</td>
      <td>Am</td>
      <td>86.999</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>542</th>
      <td>09-Kuba - 2 say goodbye</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>09-Kuba - 2 say goodbye.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>116</td>
      <td>Am</td>
      <td>160.006</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>543</th>
      <td>10-Ott -382 seaside</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>10-Ott -382 seaside.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>236</td>
      <td>Dm</td>
      <td>180.029</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>544</th>
      <td>11-Slackbaba - Metatron sugar cube</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>11-Slackbaba - Metatron sugar cube.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>291</td>
      <td>Ebm</td>
      <td>170.012</td>
      <td>15</td>
    </tr>
    <tr>
      <th>545</th>
      <td>12-Ololiuqui - Rising</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>12-Ololiuqui - Rising.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>148</td>
      <td>Em</td>
      <td>176.183</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>546</th>
      <td>13-Younger brother - I am a freak</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>13-Younger brother - I am a freak.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>275</td>
      <td>F</td>
      <td>115.01</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>547</th>
      <td>14-Chilled sequence - Horizon</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>14-Chilled sequence - Horizon.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>251</td>
      <td>Dm</td>
      <td>115.005</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>548</th>
      <td>15-Umberloid - Neon tetra</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>15-Umberloid - Neon tetra.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>257</td>
      <td>D</td>
      <td>100.008</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>549</th>
      <td>16-Zero cult Nigth out (batistatos rmx)</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>16-Zero cult Nigth out (batistatos rmx).mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>174</td>
      <td>Em</td>
      <td>82.507</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>550</th>
      <td>17-Ott - A shower of sparks</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>17-Ott - A shower of sparks.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>371</td>
      <td>Em</td>
      <td>114.926</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>551</th>
      <td>18-Sync 24 - dot</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>18-Sync 24 - dot.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>171</td>
      <td>A</td>
      <td>114.859</td>
      <td>21</td>
    </tr>
    <tr>
      <th>552</th>
      <td>19-Solar Fields - Levitate</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>19-Solar Fields - Levitate.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>245</td>
      <td>Cm</td>
      <td>120</td>
      <td>12</td>
    </tr>
    <tr>
      <th>553</th>
      <td>20-Chilled sequence - Luxury</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new ambient/:</td>
      <td>20-Chilled sequence - Luxury.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>282</td>
      <td>Gm</td>
      <td>123.007</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>554</th>
      <td>01 Protoculture &amp; Astrix- Impala 140.00  2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>01 Protoculture &amp; Astrix- Impala 140.00  2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>212</td>
      <td>Am</td>
      <td>140.006</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>555</th>
      <td>02 Aquagen Feat. Rozalla- Everybods Free (GMS Remix) 140.00 The Remixes Vol. 2 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>02 Aquagen Feat. Rozalla- Everybods Free (GMS Remix) 140.00 The Remixes Vol. 2 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>110</td>
      <td>Gbm</td>
      <td>140.015</td>
      <td>18</td>
    </tr>
    <tr>
      <th>556</th>
      <td>03 Beastie Boys- U Gotta Fight (Soundaholix Remix) 142.00 Anonymous 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>03 Beastie Boys- U Gotta Fight (Soundaholix Remix) 142.00 Anonymous 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>163</td>
      <td>Abm</td>
      <td>142.005</td>
      <td>20</td>
    </tr>
    <tr>
      <th>557</th>
      <td>04 Protoculture- Avalon (Rmx) 142.00 Premonition 2010</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>04 Protoculture- Avalon (Rmx) 142.00 Premonition 2010.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>216</td>
      <td>Fm</td>
      <td>142.006</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>558</th>
      <td>05 Sub6- down &amp; out 142.00 down &amp; out 2007</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>05 Sub6- down &amp; out 142.00 down &amp; out 2007.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>149</td>
      <td>Fm</td>
      <td>142.005</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>559</th>
      <td>06 Gms Vs Life Style Vs Audio-X-NN- 142.00 Unreleased Pack.2 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>06 Gms Vs Life Style Vs Audio-X-NN- 142.00 Unreleased Pack.2 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>216</td>
      <td>Abm</td>
      <td>141.999</td>
      <td>20</td>
    </tr>
    <tr>
      <th>560</th>
      <td>07 Visual Contact Vs. Electro Sun- Visual Sunny Day (Part 2 2010 Edit) 143.00 Especial 2010 2010</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>07 Visual Contact Vs. Electro Sun- Visual Sunny Day (Part 2 2010 Edit) 143.00 Especial 2010 2010.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>112</td>
      <td>Fm</td>
      <td>142.999</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>561</th>
      <td>08 Dna Vs. Wizzy Noise- Restart 144.00 Sounds Like A Melody CD 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>08 Dna Vs. Wizzy Noise- Restart 144.00 Sounds Like A Melody CD 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>120</td>
      <td>Am</td>
      <td>144.014</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>562</th>
      <td>09 Cosmosis &amp; Avalon -Take Flight (Cosmosis Mix) 144.06 Fumbling For The Funky Frequency 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>09 Cosmosis &amp; Avalon -Take Flight (Cosmosis Mix) 144.06 Fumbling For The Funky Frequency 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>180</td>
      <td>Bbm</td>
      <td>145.003</td>
      <td>22</td>
    </tr>
    <tr>
      <th>563</th>
      <td>10 Delirious- In The Works 145.00 To The Limit 2010</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>10 Delirious- In The Works 145.00 To The Limit 2010.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>93</td>
      <td>Abm</td>
      <td>145.007</td>
      <td>20</td>
    </tr>
    <tr>
      <th>564</th>
      <td>11 Sesto Sento- Funk-a-delic 145.00 Key To The Universe 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>11 Sesto Sento- Funk-a-delic 145.00 Key To The Universe 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>212</td>
      <td>Abm</td>
      <td>145.007</td>
      <td>20</td>
    </tr>
    <tr>
      <th>565</th>
      <td>12 Chronos Proton_Fields (Unreleased) 145.00 Proton_Fields (Unreleased) 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>12 Chronos Proton_Fields (Unreleased) 145.00 Proton_Fields (Unreleased) 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>298</td>
      <td>Gm</td>
      <td>145.007</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>566</th>
      <td>13 XSi vs Mad Maxx Bass Monkeys 145.00 XSi And Friends 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>13 XSi vs Mad Maxx Bass Monkeys 145.00 XSi And Friends 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>146</td>
      <td>Gm</td>
      <td>145.008</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>567</th>
      <td>14Dna Turbo Booster (Remix) 145.00 Remixes II 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>14Dna Turbo Booster (Remix) 145.00 Remixes II 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>159</td>
      <td>Gm</td>
      <td>145.007</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>568</th>
      <td>15 Logic Bomb South Africa 145.00 White 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>15 Logic Bomb South Africa 145.00 White 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>172</td>
      <td>Ebm</td>
      <td>145.004</td>
      <td>15</td>
    </tr>
    <tr>
      <th>569</th>
      <td>16Alien Vs The Cat Space Jam (GMS Remix) 145.00 Unreleased Pack.2 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>16Alien Vs The Cat Space Jam (GMS Remix) 145.00 Unreleased Pack.2 2009.MP3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>165</td>
      <td>Gm</td>
      <td>145.005</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>570</th>
      <td>17 Injection Sound Blaster Rmx 145.00 Choose To Live 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>17 Injection Sound Blaster Rmx 145.00 Choose To Live 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>146</td>
      <td>Bbm</td>
      <td>145.008</td>
      <td>22</td>
    </tr>
    <tr>
      <th>571</th>
      <td>18 Krome Angels Destiny (The Antidote Rmx) 145.00 White 2009</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>18 Krome Angels Destiny (The Antidote Rmx) 145.00 White 2009.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>80</td>
      <td>Bbm</td>
      <td>145.007</td>
      <td>22</td>
    </tr>
    <tr>
      <th>572</th>
      <td>19 Sesto Sento Key To The Universe 145.00 Key To The Universe 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>19 Sesto Sento Key To The Universe 145.00 Key To The Universe 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>146</td>
      <td>Gbm</td>
      <td>145.005</td>
      <td>18</td>
    </tr>
    <tr>
      <th>573</th>
      <td>20 Gataka Disco Jockey (Sesto Sento Remix) 145.00 Afula On Vol.2 (Compiled by Sesto Sento) 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>20 Gataka Disco Jockey (Sesto Sento Remix) 145.00 Afula On Vol.2 (Compiled by Sesto Sento) 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>146</td>
      <td>Am</td>
      <td>145.004</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>574</th>
      <td>21Oforia Arcadia (Oforias Deca Rmx) 145.00 Arcadia 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>21Oforia Arcadia (Oforias Deca Rmx) 145.00 Arcadia 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>311</td>
      <td>Bbm</td>
      <td>145.006</td>
      <td>22</td>
    </tr>
    <tr>
      <th>575</th>
      <td>22Psycraft Follow the Line 146.00 Art of Work 2008</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:new set 2010/:</td>
      <td>22Psycraft Follow the Line 146.00 Art of Work 2008.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>287</td>
      <td>Gm</td>
      <td>146.007</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>576</th>
      <td>PSychedelik Trance mixed by Sokeism-17-7-2010  fixed-</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:</td>
      <td>PSychedelik Trance mixed by Sokeism-17-7-2010  fixed-.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2012/3/29</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>3845</td>
      <td>NONE_KEY</td>
      <td>142.004</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>577</th>
      <td>tech_psy</td>
      <td>Mixed by Sokeism</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:</td>
      <td>tech-psy_1-12_2013.mp3</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>Psychedelic</td>
      <td>2013/12/14</td>
      <td>2013/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>1907</td>
      <td>NONE_KEY</td>
      <td>145.258</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>578</th>
      <td>tech-psy_1-12_2013</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:MIX/:</td>
      <td>tech-psy_1-12_2013.wav</td>
      <td>NADA</td>
      <td>NADA</td>
      <td>NONE_GENRE</td>
      <td>2013/12/22</td>
      <td>NONE_RELEASE_DATE</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>NONE_PLAYTIME</td>
      <td>NONE_KEY</td>
      <td>NONE_BPM</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>579</th>
      <td>Time To Get Serious (Live Mix</td>
      <td>Dynamic</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:ALL-TIME-GEMS/:</td>
      <td>10-dynamic_-_time_to_get_serious_live_mix_japan-mycel.mp3</td>
      <td>The Beach 2007-Compiled By DJ</td>
      <td>10</td>
      <td>Psychedelic</td>
      <td>2013/12/14</td>
      <td>2007/1/1</td>
      <td>NONE_RANKING</td>
      <td>2</td>
      <td>556</td>
      <td>Gm</td>
      <td>145</td>
      <td>19</td>
    </tr>
    <tr>
      <th>580</th>
      <td>Arcadia (Oforias Deca Rmx)</td>
      <td>Oforia</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:ALL-TIME-GEMS/:</td>
      <td>101-oforia_-_arcadia_(oforias_deca_rmx)-psycz.mp3</td>
      <td>Arcadia</td>
      <td>1</td>
      <td>Psychedelic</td>
      <td>2012/3/29</td>
      <td>2008/1/1</td>
      <td>255</td>
      <td>9</td>
      <td>498</td>
      <td>Fm</td>
      <td>145</td>
      <td>3</td>
    </tr>
    <tr>
      <th>581</th>
      <td>Fascinating Curry</td>
      <td>Protoculture</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:ALL-TIME-GEMS/:</td>
      <td>Fascinating_Curry.mp3</td>
      <td>Premonition</td>
      <td>2</td>
      <td>Psychedelic</td>
      <td>2012/11/25</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>9</td>
      <td>526</td>
      <td>Abm</td>
      <td>142</td>
      <td>20</td>
    </tr>
    <tr>
      <th>582</th>
      <td>spiders original rmx</td>
      <td>Oforia</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:ALL-TIME-GEMS/:[2005]_-_Oforia - Spiders (Original)/:</td>
      <td>01-oforia_-_spiders-(original)-uned.mp3</td>
      <td>CDS</td>
      <td>1</td>
      <td>Psychedelic</td>
      <td>2012/3/29</td>
      <td>2005/1/1</td>
      <td>255</td>
      <td>NONE_PLAYCOUNT</td>
      <td>475</td>
      <td>Gm</td>
      <td>145</td>
      <td>19</td>
    </tr>
    <tr>
      <th>583</th>
      <td>Seventh Son</td>
      <td>Michele Adamson</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:ALL-TIME-GEMS/:</td>
      <td>[mp3lemon.net] Michele_Adamson_-_08_-_Seventh_Son.mp3</td>
      <td>Fallen Angel</td>
      <td>8</td>
      <td>Trip-Hop</td>
      <td>2012/11/17</td>
      <td>2005/1/1</td>
      <td>NONE_RANKING</td>
      <td>3</td>
      <td>267</td>
      <td>Gm</td>
      <td>122</td>
      <td>19</td>
    </tr>
    <tr>
      <th>584</th>
      <td>Universal Frequencies</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:</td>
      <td>01-adham_shaikh_-_universal_frequencies-mycel.mp3</td>
      <td>Universal Frequencies</td>
      <td>1</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>4458</td>
      <td>NONE_KEY</td>
      <td>131.002</td>
      <td>14</td>
    </tr>
    <tr>
      <th>585</th>
      <td>Crossroads Part 1</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>01-adham_shaikh_-_Crossroads Part 1-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>607</td>
      <td>D</td>
      <td>96</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>586</th>
      <td>Water Prayer (Holden Space Mix</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>02-adham_shaikh_-_Water Prayer (Holden Space Mix)-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>453</td>
      <td>Cm</td>
      <td>104.001</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>587</th>
      <td>Water Prayer (Rastaman Vibrati</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>03-adham_shaikh_-_Water Prayer (Rastaman Vibration Mix)-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>435</td>
      <td>Gbm</td>
      <td>104.001</td>
      <td>18</td>
    </tr>
    <tr>
      <th>588</th>
      <td>Carpet Breaker</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>04-adham_shaikh_-_Carpet Breaker-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>612</td>
      <td>D</td>
      <td>120.002</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>589</th>
      <td>Rug Rippin (Green Crystal Faer</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>05-adham_shaikh_-_Rug Rippin (Green Crystal Faerie Mix)-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>743</td>
      <td>E</td>
      <td>132.001</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>590</th>
      <td>Sonicturtle's Coupe Decale</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>06-adham_shaikh_-_Sonicturtle's Coupe Decale-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>490</td>
      <td>Bm</td>
      <td>130.011</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>591</th>
      <td>Sonicturtle's Coupe Decale Rep</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>07-adham_shaikh_-_Sonicturtle's Coupe Decale Reprise-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>261</td>
      <td>Bm</td>
      <td>130.011</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>592</th>
      <td>Kundalini Fuel</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>08-adham_shaikh_-_Kundalini Fuel-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>821</td>
      <td>Bm</td>
      <td>138.001</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>593</th>
      <td>Desert Dub</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>09-adham_shaikh_-_Desert Dub-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>789</td>
      <td>Gm</td>
      <td>80.001</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>594</th>
      <td>Desert Caravan</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>10-adham_shaikh_-_Desert Caravan-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>783</td>
      <td>Eb</td>
      <td>131.002</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>595</th>
      <td>New Day</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>11-adham_shaikh_-_New Day-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>578</td>
      <td>Fm</td>
      <td>131.001</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>596</th>
      <td>The Climb</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>12-adham_shaikh_-_The Climb-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>1072</td>
      <td>Am</td>
      <td>135.001</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>597</th>
      <td>Crossroads Part 2</td>
      <td>Adham Shaikh</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:-adham Shaikh - Universal Frequencies(2010)/:Nueva carpeta/:</td>
      <td>13-adham_shaikh_-_Crossroads Part 2-mycel.mp3</td>
      <td>Tales Of Ephidrina</td>
      <td>NONE_TRACK</td>
      <td>Electronic</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>383</td>
      <td>D</td>
      <td>96</td>
      <td>nada</td>
    </tr>
    <tr>
      <th>598</th>
      <td>Endless Wonder</td>
      <td>Androcell</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:Androcell-Entheomythic/:</td>
      <td>01 Endless Wonder.mp3</td>
      <td>Entheomythic</td>
      <td>1</td>
      <td>Downtempo</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>407</td>
      <td>Em</td>
      <td>91</td>
      <td>16</td>
    </tr>
    <tr>
      <th>599</th>
      <td>Mysterious Union</td>
      <td>Androcell</td>
      <td>/:Users/:C/:Music/:Psychedelik/:PSYCHEDELIK/:AMBIENT----------------------/:Androcell-Entheomythic/:</td>
      <td>02 Mysterious Union.mp3</td>
      <td>Entheomythic</td>
      <td>2</td>
      <td>Downtempo</td>
      <td>2012/1/6</td>
      <td>2010/1/1</td>
      <td>NONE_RANKING</td>
      <td>NONE_PLAYCOUNT</td>
      <td>457</td>
      <td>Gm</td>
      <td>94.999</td>
      <td>19</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 16433 entries, 0 to 16432
    Data columns (total 15 columns):
     #   Column        Non-Null Count  Dtype 
    ---  ------        --------------  ----- 
     0   title         16433 non-null  object
     1   artist        16433 non-null  object
     2   directory     16433 non-null  object
     3   arch          16433 non-null  object
     4   album         16433 non-null  object
     5   no_track      16433 non-null  object
     6   genre         16433 non-null  object
     7   import_date   16433 non-null  object
     8   release_date  16433 non-null  object
     9   ranking       16433 non-null  object
     10  playcount     16433 non-null  object
     11  playtime      16433 non-null  object
     12  key_name      16433 non-null  object
     13  bpm           16433 non-null  object
     14  key           16433 non-null  object
    dtypes: object(15)
    memory usage: 1.9+ MB
    

## Conversión de datos


```python
datanew = df.copy()
```


```python
#datanew = datanew.loc[df['album'] != "NADA"] #Podemos eliminar entradas con un valor determinado en alguna de las columnas
```


```python
datanew['bpm'] = pd.to_numeric(datanew['bpm'], errors='coerce').astype('float64')
datanew['key'] = pd.to_numeric(datanew['key'], errors='coerce').astype('float64')
```


```python
datanew['import_date'] = datanew['import_date'].astype('datetime64[ns]')
```


```python
datanew['release_date'] = pd.to_datetime(datanew['release_date'],errors='coerce')
```


```python
datanew['no_track'] = pd.to_numeric(datanew['no_track'], errors='coerce').astype('float64')
```


```python
datanew['ranking'] = pd.to_numeric(datanew['ranking'], errors='coerce').astype('float64')
```


```python
datanew['playcount'] = pd.to_numeric(datanew['playcount'], errors='coerce').astype('float64')
```


```python

datanew['playtime'] = pd.to_numeric(datanew['playtime'], errors='coerce').astype('float64')
```


```python
datanew.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 16433 entries, 0 to 16432
    Data columns (total 15 columns):
     #   Column        Non-Null Count  Dtype         
    ---  ------        --------------  -----         
     0   title         16433 non-null  object        
     1   artist        16433 non-null  object        
     2   directory     16433 non-null  object        
     3   arch          16433 non-null  object        
     4   album         16433 non-null  object        
     5   no_track      12962 non-null  float64       
     6   genre         16433 non-null  object        
     7   import_date   16433 non-null  datetime64[ns]
     8   release_date  14571 non-null  datetime64[ns]
     9   ranking       4708 non-null   float64       
     10  playcount     5633 non-null   float64       
     11  playtime      16217 non-null  float64       
     12  key_name      16433 non-null  object        
     13  bpm           15490 non-null  float64       
     14  key           15022 non-null  float64       
    dtypes: datetime64[ns](2), float64(6), object(7)
    memory usage: 1.9+ MB
    


```python
datanew[100:200]
```




<div class="wrapper_">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>artist</th>
      <th>directory</th>
      <th>arch</th>
      <th>album</th>
      <th>no_track</th>
      <th>genre</th>
      <th>import_date</th>
      <th>release_date</th>
      <th>ranking</th>
      <th>playcount</th>
      <th>playtime</th>
      <th>key_name</th>
      <th>bpm</th>
      <th>key</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>100</th>
      <td>Flute Fruit</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>09-Shpongle_-_Flute_Fruit-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>9.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>130.0</td>
      <td>Em</td>
      <td>143.0220</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>101</th>
      <td>The Sub Genie</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>01  the sub genie.mp3</td>
      <td>Perverting Mankind</td>
      <td>1.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>392.0</td>
      <td>B</td>
      <td>124.9990</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>102</th>
      <td>Solar Seed</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>02  solar seed.mp3</td>
      <td>Perverting Mankind</td>
      <td>2.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>317.0</td>
      <td>Fm</td>
      <td>124.9990</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>103</th>
      <td>Perverting Mankind</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>03  perverting mankind.mp3</td>
      <td>Perverting Mankind</td>
      <td>3.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>428.0</td>
      <td>Gm</td>
      <td>110.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>104</th>
      <td>The Real Triek</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>04  the real triek.mp3</td>
      <td>Perverting Mankind</td>
      <td>4.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>331.0</td>
      <td>Gm</td>
      <td>120.0000</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>105</th>
      <td>West In Pieces</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>05  west in pieces.mp3</td>
      <td>Perverting Mankind</td>
      <td>5.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>440.0</td>
      <td>Gm</td>
      <td>140.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>106</th>
      <td>Bhang Galore</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>06  bhang galore.mp3</td>
      <td>Perverting Mankind</td>
      <td>6.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>436.0</td>
      <td>Dm</td>
      <td>85.0001</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>107</th>
      <td>Countdown To Meltdown (Featuring Atomic Drop)</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>07  countdown to meltdown (featuring atom).mp3</td>
      <td>Perverting Mankind</td>
      <td>7.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>406.0</td>
      <td>Gm</td>
      <td>135.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>108</th>
      <td>One Sure Curative</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>08  one sure curative.mp3</td>
      <td>Perverting Mankind</td>
      <td>8.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>500.0</td>
      <td>Dm</td>
      <td>99.9995</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>109</th>
      <td>Up In Smoke</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>09  up in smoke.mp3</td>
      <td>Perverting Mankind</td>
      <td>9.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>474.0</td>
      <td>Em</td>
      <td>108.0000</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>110</th>
      <td>Domain</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>10  domain.mp3</td>
      <td>Perverting Mankind</td>
      <td>10.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>446.0</td>
      <td>B</td>
      <td>79.9997</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>111</th>
      <td>Rub My Dub</td>
      <td>Slackbaba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:</td>
      <td>11  rub my dub.mp3</td>
      <td>Perverting Mankind</td>
      <td>11.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>463.0</td>
      <td>Dm</td>
      <td>89.9999</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>112</th>
      <td>Sunlit Path 3</td>
      <td>Gus Till</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>01-gus_till_-_sunlit_path_3-br.mp3</td>
      <td>Paz</td>
      <td>1.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>192.0</td>
      <td>Em</td>
      <td>78.0002</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>113</th>
      <td>Forest Hideout</td>
      <td>Ren Toudu</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>02-ren_toudu_-_forest_hideout-br.mp3</td>
      <td>Paz</td>
      <td>2.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>565.0</td>
      <td>Ab</td>
      <td>80.0006</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>114</th>
      <td>Cuasran</td>
      <td>Selianego</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>03-selianego_-_cuasran-br.mp3</td>
      <td>Paz</td>
      <td>3.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>290.0</td>
      <td>Em</td>
      <td>140.0010</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>115</th>
      <td>Through Endless Ice Waters</td>
      <td>Lauge And Baba Gnohm feat.Vonoom</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>04-lauge_and_baba_gnohm_feat._vonoom_-_through_endless_ice_waters-br.mp3</td>
      <td>Paz</td>
      <td>4.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>395.0</td>
      <td>E</td>
      <td>120.0010</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>116</th>
      <td>Fly Away My Sadness</td>
      <td>Maiia</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>05-maiia_-_fly_away_my_sadness-br.mp3</td>
      <td>Paz</td>
      <td>5.0</td>
      <td>Amb</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>346.0</td>
      <td>Bm</td>
      <td>85.9996</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>117</th>
      <td>Splashed</td>
      <td>BlueBliss (aka Alireza Zaifnejad)</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>06-bluebliss_aka_alireza_zaifnejad_-_splashed-br.mp3</td>
      <td>Paz</td>
      <td>6.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>295.0</td>
      <td>Dm</td>
      <td>87.0000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>118</th>
      <td>Goodbye - Hello</td>
      <td>Tor.Ma And X.D.3</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>07-tor.ma_and_x.d.3_-_goodby-hello-br.mp3</td>
      <td>Paz</td>
      <td>7.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>542.0</td>
      <td>Am</td>
      <td>89.9998</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>119</th>
      <td>Something For Life</td>
      <td>Ovnimooon</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>08-ovnimooon_-_something_for_life-br.mp3</td>
      <td>Paz</td>
      <td>8.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>418.0</td>
      <td>Cm</td>
      <td>125.9990</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>120</th>
      <td>House Of The Flying People</td>
      <td>Suduaya</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>09-suduaya_-_house_of_the_flying_people-br.mp3</td>
      <td>Paz</td>
      <td>9.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>488.0</td>
      <td>Fm</td>
      <td>127.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>121</th>
      <td>Dawn</td>
      <td>Terra Nine</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>10-terra_nine_-_dawn-br.mp3</td>
      <td>Paz</td>
      <td>10.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>535.0</td>
      <td>C</td>
      <td>98.9999</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>122</th>
      <td>Tango Bay (Ovnimoon Sunset rmx)</td>
      <td>UnitBlue</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>11-unitblue_-_tango_bay_(ovnimoon_sunset_rmx)-br.mp3</td>
      <td>Paz</td>
      <td>11.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>22.0</td>
      <td>321.0</td>
      <td>Am</td>
      <td>123.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>123</th>
      <td>Autumn Pond</td>
      <td>Ren Toudu</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:</td>
      <td>12-ren_toudu_-_autumn_pond-br.mp3</td>
      <td>Paz</td>
      <td>12.0</td>
      <td>Ambient</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>685.0</td>
      <td>Dm</td>
      <td>149.3560</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>124</th>
      <td>Kremlin Gremlin (Album Edit)</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>01 - Kremlin Gremlin (Album Edit).mp3</td>
      <td>Kremlin Gremlin</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>446.0</td>
      <td>Bm</td>
      <td>149.0000</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>125</th>
      <td>Lord Nord</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>02 - Lord Nord.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>2.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>438.0</td>
      <td>Gm</td>
      <td>148.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>126</th>
      <td>Dark Passenger</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>03 - Dark Passenger.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>3.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>401.0</td>
      <td>Gm</td>
      <td>148.0000</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>127</th>
      <td>Retch (Fungus Funk Edit)</td>
      <td>Artifakt</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>04 - Retch (Fungus Funk Edit).mp3</td>
      <td>Kremlin Gremlin</td>
      <td>4.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>481.0</td>
      <td>Ebm</td>
      <td>148.0000</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>128</th>
      <td>Bad Robot</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>05 - Bad Robot.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>5.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>416.0</td>
      <td>Gm</td>
      <td>146.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>129</th>
      <td>Odinsovsky</td>
      <td>Fungus Funk Vs. Psykovsky</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>06 - Odinsovsky.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>6.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>435.0</td>
      <td>Bbm</td>
      <td>149.9990</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>130</th>
      <td>Mind Tetris</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>07 - Mind Tetris.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>7.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>456.0</td>
      <td>Am</td>
      <td>152.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>131</th>
      <td>Power On</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>08 - Power On.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>8.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>481.0</td>
      <td>Gbm</td>
      <td>152.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>132</th>
      <td>My Lasergun</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>09 - My Lasergun.mp3</td>
      <td>Kremlin Gremlin</td>
      <td>9.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>418.0</td>
      <td>Gm</td>
      <td>148.0000</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>133</th>
      <td>Microcosmos (2012 Remix/Album Edit)</td>
      <td>Fungus Funk</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:</td>
      <td>10 - Microcosmos (2012 RemixAlbum Edit).mp3</td>
      <td>Kremlin Gremlin</td>
      <td>10.0</td>
      <td>Psychedelic</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>548.0</td>
      <td>E</td>
      <td>155.0010</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>134</th>
      <td>Shri Maharaj (Compiled &amp; Mixed by Goa Gil) | www.PsyNation.com</td>
      <td>V.A.</td>
      <td>/:Users/:C/:Music/:Psychedelik/:DARK/:V.A. - Shri Maharaj (Compiled &amp; Mixed by Goa Gil)/:</td>
      <td>V.A. - Shri Maharaj (Compiled &amp; Mixed by Goa Gil).mp3</td>
      <td>Shri Maharaj</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>4350.0</td>
      <td>NONE_KEY</td>
      <td>79.0000</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>135</th>
      <td>Electric Universe - Live Set 2012</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:</td>
      <td>Electric Universe - Live Set 2012.mp3</td>
      <td>NADA</td>
      <td>NaN</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>757.0</td>
      <td>NONE_KEY</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>136</th>
      <td>Computers &amp; Microprocessors</td>
      <td>Logic Bomb</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:</td>
      <td>01 Computers &amp; Microprocessors (Orignal).mp3</td>
      <td>Computers &amp; Microprocessors EP</td>
      <td>1.0</td>
      <td>Goa</td>
      <td>2013-12-14</td>
      <td>2002-01-01</td>
      <td>255.0</td>
      <td>10.0</td>
      <td>454.0</td>
      <td>Gm</td>
      <td>146.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>137</th>
      <td>Turn To Dust</td>
      <td>Peace Maker</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:</td>
      <td>209-peace_maker_-_turn_to_dust-psycz.mp3</td>
      <td>Intensity - Compiled by Dj Amito</td>
      <td>9.0</td>
      <td>Psychedelic</td>
      <td>2012-08-30</td>
      <td>2008-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>444.0</td>
      <td>Gm</td>
      <td>144.0000</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>138</th>
      <td>Power Science (Vs. Lost &amp; Found)</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum.-Co Lab Part 01 2011/:</td>
      <td>01 Absolum Vs. Lost &amp; Found - Power Science.mp3</td>
      <td>Co Lab Part 01</td>
      <td>1.0</td>
      <td>Full-On Night</td>
      <td>2012-01-04</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>9.0</td>
      <td>502.0</td>
      <td>D#</td>
      <td>145.0000</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>139</th>
      <td>Get Up Now (Vs. Outer Signal)</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum.-Co Lab Part 01 2011/:</td>
      <td>02 Absolum Vs. Outer Signal - Get Up Now.mp3</td>
      <td>Co Lab Part 01</td>
      <td>2.0</td>
      <td>Full-On Night</td>
      <td>2012-01-04</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>8.0</td>
      <td>522.0</td>
      <td>Gm</td>
      <td>146.0000</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>140</th>
      <td>The Stomper</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_01_-_The_Stomper.mp3</td>
      <td>Inside The Sphere</td>
      <td>1.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>14.0</td>
      <td>449.0</td>
      <td>Cm</td>
      <td>145.0000</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>141</th>
      <td>Virus</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_02_-_Virus.mp3</td>
      <td>Inside The Sphere</td>
      <td>2.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>470.0</td>
      <td>Am</td>
      <td>144.9970</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>142</th>
      <td>Off Beat</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_03_-_Off_Beat.mp3</td>
      <td>Inside The Sphere</td>
      <td>3.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>450.0</td>
      <td>Abm</td>
      <td>145.0000</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>143</th>
      <td>Inside The Sphere</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_04_-_Inside_The_Sphere.mp3</td>
      <td>Inside The Sphere</td>
      <td>4.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>494.0</td>
      <td>Gm</td>
      <td>146.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>144</th>
      <td>Extreme Circumstances</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_05_-_Extreme_Circumstances.mp3</td>
      <td>Inside The Sphere</td>
      <td>5.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>167.0</td>
      <td>Gm</td>
      <td>147.0000</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>145</th>
      <td>The Race (Pole Position Mix)</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_06_-_The_Race_Pole_Position_Mix_.mp3</td>
      <td>Inside The Sphere</td>
      <td>6.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>8.0</td>
      <td>258.0</td>
      <td>Gm</td>
      <td>145.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>146</th>
      <td>OB 1</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_07_-_OB_1.mp3</td>
      <td>Inside The Sphere</td>
      <td>7.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>493.0</td>
      <td>Bbm</td>
      <td>145.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>147</th>
      <td>Salam</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_08_-_Salam.mp3</td>
      <td>Inside The Sphere</td>
      <td>8.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>451.0</td>
      <td>Abm</td>
      <td>143.0000</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>148</th>
      <td>That Is Final</td>
      <td>Absolum</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:</td>
      <td>Absolum_-_09_-_That_Is_Final.mp3</td>
      <td>Inside The Sphere</td>
      <td>9.0</td>
      <td>Hardcore</td>
      <td>2013-06-21</td>
      <td>2004-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>473.0</td>
      <td>Abm</td>
      <td>120.0000</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>149</th>
      <td>Humans Will Play For Robots (Morning Mix)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>01-astral_projection_-_humans_will_play_for_robots_(morning_mix).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>487.0</td>
      <td>Gm</td>
      <td>145.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>150</th>
      <td>One (A Team Rmx)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>02-astral_projection_-_one_(a_team_rmx).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>2.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>524.0</td>
      <td>Gm</td>
      <td>144.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>151</th>
      <td>Open Society (Atomic Pulse Rmx)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>03-astral_projection_-_open_society_(atomic_pulse_rmx).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>3.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>509.0</td>
      <td>Dm</td>
      <td>146.0000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>152</th>
      <td>Open Society (Synsun Rmx)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>04-astral_projection_-_open_society_(synsun_rmx).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>4.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>481.0</td>
      <td>Dm</td>
      <td>146.0000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>153</th>
      <td>Open Society (Silicon Sound Rmx)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>05-astral_projection_-_open_society_(silicon_sound_rmx).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>5.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>487.0</td>
      <td>D</td>
      <td>142.0000</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>154</th>
      <td>Open Society</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>06-astral_projection_-_open_society.mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>6.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>603.0</td>
      <td>Am</td>
      <td>146.0000</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>155</th>
      <td>One (Ministry Mix)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>07-astral_projection_-_one_(ministry_mix).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>7.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>562.0</td>
      <td>Gm</td>
      <td>142.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>156</th>
      <td>The History Of War (Feat. Fatali)(Fatali Rmx)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>08-astral_projection_-_the_history_of_war_(feat._fatali)_(fatali_rmx).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>8.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>509.0</td>
      <td>Gm</td>
      <td>141.0000</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>157</th>
      <td>Humans Will Play For Robots (John Oofleming &amp; Digital Blonde Rmx)</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection-The_Blissdom_EP_(11th_Anniversary_Limited_Edition)-2010-USF/:</td>
      <td>09-astral_projection_-_humans_will_play_for_robots_(john_oofleming_and_digital_blonde_rmx).mp3</td>
      <td>The Blissdom EP (11th Anniversary Limited Edition)</td>
      <td>9.0</td>
      <td>Psychedelic</td>
      <td>2012-01-04</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>539.0</td>
      <td>Gbm</td>
      <td>139.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>158</th>
      <td>Strange World (Astral Projecti</td>
      <td>Astral Projection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Astral_Projection_-_Strange_World_(Astral_Projection_Rmx)_(Unreleased)-2009-KMx/:</td>
      <td>01_Astral_Projection_-_Strange_World_(Astral_Projection_Rmx)-KMx.mp3</td>
      <td>Strange World (Astral Projecti</td>
      <td>3.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2009-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>543.0</td>
      <td>Bbm</td>
      <td>139.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>159</th>
      <td>State Of Mind</td>
      <td>Raoul</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>01 State Of Mind.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>592.0</td>
      <td>Abm</td>
      <td>148.0000</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>160</th>
      <td>Massive Dynamic</td>
      <td>Tryon</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>02 Massive Dynamic.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>2.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>519.0</td>
      <td>Abm</td>
      <td>148.0000</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>161</th>
      <td>Bullzeye</td>
      <td>Technodrome</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>03 Bullzeye.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>3.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>491.0</td>
      <td>Em</td>
      <td>146.0000</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>162</th>
      <td>Badass</td>
      <td>Orca</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>04 Badass.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>4.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>478.0</td>
      <td>Ebm</td>
      <td>146.0000</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>163</th>
      <td>Definitely Diabolic</td>
      <td>Magneto</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>05 Definitely Diabolic.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>5.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>473.0</td>
      <td>Gm</td>
      <td>146.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>164</th>
      <td>Ice Queen (Zion Linguist Rmx)</td>
      <td>Pitch Hikers</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>06 Ice Queen (Zion Linguist Rmx).mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>6.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>366.0</td>
      <td>Gm</td>
      <td>148.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>165</th>
      <td>Walk Through The Portal</td>
      <td>Sidhartha</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>07 Walk Through The Portal.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>7.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>475.0</td>
      <td>Bbm</td>
      <td>146.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>166</th>
      <td>Just Scream</td>
      <td>Raz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>08 Just Scream.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>8.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>401.0</td>
      <td>Am</td>
      <td>145.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>167</th>
      <td>Search For Emotions</td>
      <td>Raz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Compile Your Mind-Compiled By Dj Raveoholic/:</td>
      <td>09 Search For Emotions.mp3</td>
      <td>Compile Your Mind-Compiled By DJ Raveoholic</td>
      <td>9.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>185.0</td>
      <td>Gm</td>
      <td>85.0010</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>168</th>
      <td>In Control</td>
      <td>CPU</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:CPU_-_Central_Processing_Unit_EP-(PBR200)-WEB-2012-NRG/:</td>
      <td>01-cpu_-_in_control-nrg.mp3</td>
      <td>Central Processing Unit EP WEB</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>516.0</td>
      <td>G</td>
      <td>145.0000</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>169</th>
      <td>Kung Fu</td>
      <td>CPU</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:CPU_-_Central_Processing_Unit_EP-(PBR200)-WEB-2012-NRG/:</td>
      <td>02-cpu_-_kung_fu-nrg.mp3</td>
      <td>Central Processing Unit EP WEB</td>
      <td>2.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>603.0</td>
      <td>Bbm</td>
      <td>143.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>170</th>
      <td>Sweet Beats</td>
      <td>CPU</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:CPU_-_Central_Processing_Unit_EP-(PBR200)-WEB-2012-NRG/:</td>
      <td>03-cpu_-_sweet_beats-nrg.mp3</td>
      <td>Central Processing Unit EP WEB</td>
      <td>3.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>521.0</td>
      <td>Em</td>
      <td>140.0000</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>171</th>
      <td>Five Kilo</td>
      <td>CPU</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:CPU_-_Central_Processing_Unit_EP-(PBR200)-WEB-2012-NRG/:</td>
      <td>04-cpu_-_five_kilo-nrg.mp3</td>
      <td>Central Processing Unit EP WEB</td>
      <td>4.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>462.0</td>
      <td>Gbm</td>
      <td>145.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>172</th>
      <td>My First Melody</td>
      <td>CPU</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:CPU_-_Central_Processing_Unit_EP-(PBR200)-WEB-2012-NRG/:</td>
      <td>05-cpu_-_my_first_melody-nrg.mp3</td>
      <td>Central Processing Unit EP WEB</td>
      <td>5.0</td>
      <td>Psychedelic</td>
      <td>2013-12-14</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>500.0</td>
      <td>Gbm</td>
      <td>148.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>173</th>
      <td>Dirty Demo Tape</td>
      <td>Cycle Sphere</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>01_Cycle Sphere_Cycle Sphere _ Dirty Demo Tape.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>1.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>419.0</td>
      <td>Em</td>
      <td>145.0000</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>174</th>
      <td>Shazzem</td>
      <td>Cycle Sphere</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>02_Cycle Sphere_Cycle Sphere _ Shazzem.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>2.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>400.0</td>
      <td>F</td>
      <td>73.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>175</th>
      <td>The Fans</td>
      <td>Cycle Sphere</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>03_Cycle Sphere_Cycle Sphere vs Megaband _ The Fans.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>3.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>1.0</td>
      <td>376.0</td>
      <td>Gm</td>
      <td>146.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>176</th>
      <td>Dance to my Beat</td>
      <td>Cycle Sphere</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>04_Cycle Sphere_Cycle Sphere _ Dance to my Beat.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>4.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>1.0</td>
      <td>375.0</td>
      <td>Am</td>
      <td>146.0000</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>177</th>
      <td>Get Down</td>
      <td>Cycle Sphere vs Eskimo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>05_Cycle Sphere_Cycle Sphere vs Eskimo _ Get Down.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>5.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>5.0</td>
      <td>483.0</td>
      <td>Am</td>
      <td>143.9990</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>178</th>
      <td>I Wanna Rock (Cycle Sphere Rmx)</td>
      <td>Eskimo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>06_Cycle Sphere_Eskimo _ I Wanna Rock (Cycle Sphere rmx).mp3</td>
      <td>Dirty Demo Tape</td>
      <td>6.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>1.0</td>
      <td>411.0</td>
      <td>Em</td>
      <td>145.0000</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>179</th>
      <td>Pump It (Cycle Sphere Rmx)</td>
      <td>Switch</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>07_Cycle Sphere_Switch _ Pump It (Cycle Sphere rmx).mp3</td>
      <td>Dirty Demo Tape</td>
      <td>7.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>365.0</td>
      <td>Em</td>
      <td>145.0000</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>180</th>
      <td>Boys &amp; Girls</td>
      <td>Cycle Sphere vs Switch</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>08_Cycle Sphere_Cycle Sphere vs Switch _ Boys &amp; Girls.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>8.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>378.0</td>
      <td>Dm</td>
      <td>145.0000</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>181</th>
      <td>Going Anywhere</td>
      <td>Cycle Sphere</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>09_Cycle Sphere_Cycle Sphere _ Going Anywhere.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>9.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>1.0</td>
      <td>523.0</td>
      <td>Bm</td>
      <td>146.0000</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>182</th>
      <td>Outro</td>
      <td>Cycle Sphere</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:cycle_sphere_dirty_demo_tape/:</td>
      <td>10_Cycle Sphere_Cycle Sphere _ Outro.mp3</td>
      <td>Dirty Demo Tape</td>
      <td>10.0</td>
      <td>NONE_GENRE</td>
      <td>2012-03-29</td>
      <td>2011-01-01</td>
      <td>255.0</td>
      <td>NaN</td>
      <td>198.0</td>
      <td>Cm</td>
      <td>85.2140</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>183</th>
      <td>Step_By_Step</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>01-Deedrah_-_Step_By_Step-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>493.0</td>
      <td>A#m</td>
      <td>132.0010</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>184</th>
      <td>Pendulum</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>02-Deedrah_-_Pendulum-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>2.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>495.0</td>
      <td>Am</td>
      <td>135.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>185</th>
      <td>Out_Of_Contro</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>03-Deedrah_-_Out_Of_Contro-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>3.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>452.0</td>
      <td>Gm</td>
      <td>134.0000</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>186</th>
      <td>Cycles_Of_Life_2012</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>04-Deedrah_-_Cycles_Of_Life_2012-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>4.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>523.0</td>
      <td>Am</td>
      <td>137.9990</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>187</th>
      <td>Purple_Unicorn (Hard Mix)</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>05-Deedrah_-_Purple_Unicorn_(Hard_Mix)-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>5.0</td>
      <td>Psychedelic</td>
      <td>2015-11-20</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>15.0</td>
      <td>403.0</td>
      <td>Dbm</td>
      <td>130.0000</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>188</th>
      <td>Over_Bloody_Flood (Old School Mix)</td>
      <td>Deedrah And Blue Planet Corporation</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>06-Deedrah_And_Blue_Planet_Corporation_-_Over_Bloody_Flood_(Old_School_Mix)-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>6.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>452.0</td>
      <td>Bbm</td>
      <td>135.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>189</th>
      <td>Soul_Motherfuckers</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>07-Deedrah_-_Soul_Motherfuckers-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>7.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>391.0</td>
      <td>Am</td>
      <td>140.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>190</th>
      <td>Motel_Lover</td>
      <td>Deedrah And DKN</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>08-Deedrah_And_DKN_-_Motel_Lover-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>8.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>470.0</td>
      <td>Gm</td>
      <td>143.0000</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>191</th>
      <td>Ananda (Morning Mix)</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>09-Deedrah_-_Ananda_(Morning_Mix)-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>9.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>507.0</td>
      <td>Gbm</td>
      <td>135.9990</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>192</th>
      <td>Half_Of_Me (Micky Noise RMX)</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>10-Deedrah_-_Half_Of_Me_(Micky_Noise_RMX)-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>10.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>481.0</td>
      <td>Fm</td>
      <td>142.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>193</th>
      <td>Gayatri (Deedrah Mix)</td>
      <td>Deedrah And Astrix</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>11-Deedrah_And_Astrix_-_Gayatri_(Deedrah_Mix)-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>11.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>4.0</td>
      <td>555.0</td>
      <td>Fm</td>
      <td>135.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>194</th>
      <td>Over_Bloody_Flood (Tech Mix)</td>
      <td>Deedrah And Blue Planet Corporation</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>12-Deedrah_And_Blue_Planet_Corporation_-_Over_Bloody_Flood_(Tech_Mix)-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>12.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>481.0</td>
      <td>Dm</td>
      <td>130.0000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>195</th>
      <td>Half_Of_Me</td>
      <td>Deedrah</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:Deedra_-_Out_Of_Control_(HMCD81)-2012-PyS/:</td>
      <td>13-Deedrah_-_Half_Of_Me-PyS.mp3</td>
      <td>Out Of Control (HMCD81)</td>
      <td>13.0</td>
      <td>Psychedelic</td>
      <td>2012-11-25</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>7.0</td>
      <td>450.0</td>
      <td>Fm</td>
      <td>125.0000</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>196</th>
      <td>Alice in Wonderland 2012 (Original Mix)</td>
      <td>DNA, Injection</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:DNA vs Injection - Retro EP [2012]/:</td>
      <td>DNA vs Injection - Alice In Wonderland 2012 (Original Mix).mp3</td>
      <td>Retro</td>
      <td>2.0</td>
      <td>Psy-Trance</td>
      <td>2013-01-27</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>8.0</td>
      <td>441.0</td>
      <td>E</td>
      <td>144.0000</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>197</th>
      <td>DNA - The Music 2012</td>
      <td>NONE_ARTIST</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:DNA vs Injection - Retro EP [2012]/:</td>
      <td>DNA vs Injection - The Music 2012.mp3</td>
      <td>NONE_TITLE</td>
      <td>1.0</td>
      <td>NONE_GENRE</td>
      <td>2013-01-27</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>444.0</td>
      <td>Abm</td>
      <td>145.8540</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>198</th>
      <td>Fear Of The Dark (DNA Remix) by www.PsyNation.com</td>
      <td>Yahel</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:DNA_Fear_of_the_dark_The Remixes/:</td>
      <td>01. Yahel - Fear Of The Dark (DNA Remix).mp3</td>
      <td>Fear Of The Dark: The Remixes</td>
      <td>1.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>446.0</td>
      <td>Dm</td>
      <td>145.0000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>199</th>
      <td>Psychedelic Lover (DNA Remix) by www.PsyNation.com</td>
      <td>Gms Vs. Perplex</td>
      <td>/:Users/:C/:Music/:Psychedelik/:FULL-ON/:DNA_Fear_of_the_dark_The Remixes/:</td>
      <td>02. GMS Vs. Perplex - Psychedelic Lover (DNA Remix).mp3</td>
      <td>Fear Of The Dark: The Remixes</td>
      <td>2.0</td>
      <td>Psychedelic</td>
      <td>2012-03-29</td>
      <td>2010-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>446.0</td>
      <td>Fm</td>
      <td>142.0000</td>
      <td>17.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
datanew.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 16433 entries, 0 to 16432
    Data columns (total 15 columns):
     #   Column        Non-Null Count  Dtype         
    ---  ------        --------------  -----         
     0   title         16433 non-null  object        
     1   artist        16433 non-null  object        
     2   directory     16433 non-null  object        
     3   arch          16433 non-null  object        
     4   album         16433 non-null  object        
     5   no_track      12962 non-null  float64       
     6   genre         16433 non-null  object        
     7   import_date   16433 non-null  datetime64[ns]
     8   release_date  14571 non-null  datetime64[ns]
     9   ranking       4708 non-null   float64       
     10  playcount     5633 non-null   float64       
     11  playtime      16217 non-null  float64       
     12  key_name      16433 non-null  object        
     13  bpm           15490 non-null  float64       
     14  key           15022 non-null  float64       
    dtypes: datetime64[ns](2), float64(6), object(7)
    memory usage: 1.9+ MB
    


```python

len(df.album.unique())
```




    1451



## Valores null


```python
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
plt.figure(figsize=(15,5),facecolor='#00000000')
sns.heatmap(datanew.isnull(),yticklabels=False,cbar=False,cmap=['green','red']) # 
plt.show()
```


    
![png](/jp/assets/img/nml_parsing/nml_parsing-01.png)
    


## Redundancia en los géneros


```python
datanew.genre.unique()
```




    array(['TechHouse', 'Deep House', 'Hip Hop', 'Psychedelic', 'Reggae',
           'Psychill', 'Electronic', 'NONE_GENRE', 'Ambient', 'Amb', 'Goa',
           'Full-On Night', 'Hardcore', 'Psy-Trance', 'Trance', 'Psytrance',
           'Psychedelic Trance', 'Other', 'psychedelic', 'Trip-Hop',
           'Downtempo', 'Ambient / Psy-Ambient', 'Dance', 'Psy Trance',
           'Electronica', 'House',
           'ã\x82¨ã\x83¬ã\x82¯ã\x83\x88ã\x83\xadã\x83\x8bã\x83\x83ã\x82¯ ã\x83\x80ã\x83³ã\x82¹',
           'Progressive Electronic', 'electronic', 'Psychadelic Psychedelic',
           'New Age', 'Darkpsy', 'Psychadelic', 'Psy trance',
           'Psychedelic Psychadelic', 'Blues', 'Lo-Fi', 'Space', 'Techno',
           'psytrance, goa', 'genre', 'Unknown', 'PsyTrance', 'Soundtrack',
           'user defined', 'Rock', 'Classic Rock', 'Easy Listening',
           'Full On',
           'Â\x83GÂ\x83Â\x8cÂ\x83NÂ\x83gÂ\x83Â\x8dÂ\x83jÂ\x83bÂ\x83N (Â\x88Ãª',
           'Industrial', '?', 'Progressive', 'Goa Trance', 'Psy/Goa Trance',
           'Progressive ', 'Progressive Trance', 'Boker',
           'Progressive Psytrance', 'pop', 'Psy-Trance, Progressive Trance',
           'PsyTrance, Progressive Trance', 'Progressive, Psytrance',
           'Electronic, Goa trance, Psychedelic, Trance',
           'Psy, Goa Trance, Progressive', 'rogressive Psychedelic Trance',
           'Gangsta', 'Rap', 'Hip-Hop/Rap General', 'Hip-Hop',
           'Underground Hip-Hop', 'Rap, Hip Hop international', 'Rap/Hip-Hop',
           'Hip Hop/Rap', 'Hip-Hop/Rap', 'Rap & Hip-Hop', 'Hip Hop, Dubstep',
           'Alternativa', 'Crossover', 'Alternative',
           'Suburban Noize Records', 'Hip-Hop/rap', 'Rap Y Hip-Hop',
           'Chillout, Downtempo, Ambient Dub', 'Psy Prog',
           'Psychedelic trance/goa trance',
           'Ð¢Ð°Ð½Ñ\x86ÐµÐ²Ð°Ð»Ñ\x8cÐ½Ð°Ñ\x8f Ð¼Ñ\x83Ð·Ñ\x8bÐºÐ°',
           'Psychedelic, Progressive', 'Psychedelic/Progressive Trance',
           'Breaks', 'Indie', 'Disco', 'Pop', 'Tipparade', 'R&B', '[Pop',
           'Instrumental', 'Deep House, Tech House, Techno', 'Tech House',
           'Tech house', 'Minimal/Tech House', 'Podcast', 'Dance/Electronic',
           'Psychill/Downtempo/Ambient/Dub', 'Psy, Goa Trance',
           'Psy-Trance, Psychedelic', 'Chill', 'Noise',
           'Psychedelic, Goa Trance', 'Psy-Trance / Dubstep / Electro',
           'Acid/IDM/Ambient', 'Psychill/Tribal/Downtempo/Ambient',
           'Psychill/Psy-Trance/Tribal/Downtempo/Dub/Ambient',
           'Psychill/Downtempo/Psy-Trance/Tribal/Ambient', 'Dub, Downtempo',
           'Goa Trance, Psy Trance', 'Melodic House, Progressive House',
           'Psy-Trance, Psychedelic, Electronic', 'Psychedelic, Psy Trance',
           'Rap/Hip Hop', 'Psy-Trance / Dubstep',
           'Psy-Trance, Psychedelic, Goa, Full On, Electronic',
           'Trance, Psy Trance', 'Dance; Trance'], dtype=object)




```python
len(datanew.genre.unique())
```




    124



Una serie de operaciones para a traves de regex localizar y sustituir algunos generos redundantes.


```python
datanew["genre"].replace({"ã\x82¨ã\x83¬ã\x82¯ã\x83\x88ã\x83\xadã\x83\x8bã\x83\x83ã\x82¯ ã\x83\x80ã\x83³ã\x82¹": "Psychedelik trance"}, inplace=True)
```


```python
datanew["genre"].replace({"Â\x83GÂ\x83Â\x8cÂ\x83NÂ\x83gÂ\x83Â\x8dÂ\x83jÂ\x83bÂ\x83N (Â\x88Ãª": "Psychedelik trance"}, inplace=True)
```


```python
datanew["genre"].replace({"Ð¢Ð°Ð½ÑÐµÐ²Ð°Ð»ÑÐ½Ð°Ñ Ð¼ÑÐ·ÑÐºÐ°": "Progressive Psytrance"}, inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'(Psyche)\w+', value='-Psychedelik', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*((Psyche)|(Psycha)).*', value='-Psychedelik', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(House).*', value='-House', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(Hip-Hop|Hip Hop).*', value='-Hip-Hop', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(rap|Rap).*', value='-Hip-Hop', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(chill |Chill).*', value='-Ambient', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(Psychill).*', value='-Ambient', regex=True ,inplace=True)
```


```python
lista_gg = datanew.genre.unique()
```


```python
len(sorted(lista_gg))
```




    82




```python
sorted(lista_gg)
```




    ['-Ambient',
     '-Hip-Hop',
     '-House',
     '-Psychedelik',
     '?',
     'Acid/IDM/Ambient',
     'Alternativa',
     'Alternative',
     'Amb',
     'Ambient',
     'Ambient / Psy-Ambient',
     'Blues',
     'Boker',
     'Breaks',
     'Classic Rock',
     'Crossover',
     'Dance',
     'Dance/Electronic',
     'Dance; Trance',
     'Darkpsy',
     'Disco',
     'Downtempo',
     'Dub, Downtempo',
     'Easy Listening',
     'Electronic',
     'Electronica',
     'Full On',
     'Full-On Night',
     'Gangsta',
     'Goa',
     'Goa Trance',
     'Goa Trance, Psy Trance',
     'Hardcore',
     'Indie',
     'Industrial',
     'Instrumental',
     'Lo-Fi',
     'NONE_GENRE',
     'New Age',
     'Noise',
     'Other',
     'Podcast',
     'Pop',
     'Progressive',
     'Progressive ',
     'Progressive Electronic',
     'Progressive Psytrance',
     'Progressive Trance',
     'Progressive, Psytrance',
     'Psy Prog',
     'Psy Trance',
     'Psy trance',
     'Psy, Goa Trance',
     'Psy, Goa Trance, Progressive',
     'Psy-Trance',
     'Psy-Trance / Dubstep',
     'Psy-Trance / Dubstep / Electro',
     'Psy-Trance, Progressive Trance',
     'Psy/Goa Trance',
     'PsyTrance',
     'PsyTrance, Progressive Trance',
     'Psytrance',
     'R&B',
     'Reggae',
     'Rock',
     'Soundtrack',
     'Space',
     'Suburban Noize Records',
     'Tech house',
     'Techno',
     'Tipparade',
     'Trance',
     'Trance, Psy Trance',
     'Trip-Hop',
     'Unknown',
     '[Pop',
     'electronic',
     'genre',
     'pop',
     'psychedelic',
     'psytrance, goa',
     'user defined']




```python
genre_df = datanew['genre'] == 'Dance; Trance'
```


```python
datanew.loc[genre_df]
```




<div class="wrapper_">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>artist</th>
      <th>directory</th>
      <th>arch</th>
      <th>album</th>
      <th>no_track</th>
      <th>genre</th>
      <th>import_date</th>
      <th>release_date</th>
      <th>ranking</th>
      <th>playcount</th>
      <th>playtime</th>
      <th>key_name</th>
      <th>bpm</th>
      <th>key</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>15997</th>
      <td>Table Dennis (Extended Mix)</td>
      <td>Sam Jones</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>01 - Sam Jones - Table Dennis (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>1.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>430.0</td>
      <td>NONE_KEY</td>
      <td>142.000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>15998</th>
      <td>Furthest Reach (Extended Mix)</td>
      <td>Jirah; Magnus</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>02 - Jirah; Magnus - Furthest Reach (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>2.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>507.0</td>
      <td>NONE_KEY</td>
      <td>143.000</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>15999</th>
      <td>Sivam (Extended Mix)</td>
      <td>Beatman; Ludmilla</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>03 - Beatman; Ludmilla - Sivam (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>3.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>361.0</td>
      <td>NONE_KEY</td>
      <td>138.001</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>16000</th>
      <td>Adhana</td>
      <td>Vini Vici; Astrix</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>04 - Vini Vici; Astrix - Adhana.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>4.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>461.0</td>
      <td>NONE_KEY</td>
      <td>138.000</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>16001</th>
      <td>Pandemonium</td>
      <td>Eddie Bitar; Psycrain</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>05 - Eddie Bitar; Psycrain - Pandemonium.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>5.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>417.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>16002</th>
      <td>Kick Bass Acid Loud (Extended Mix)</td>
      <td>Simon Patterson</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>06 - Simon Patterson - Kick Bass Acid Loud (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>6.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>9.0</td>
      <td>446.0</td>
      <td>NONE_KEY</td>
      <td>138.000</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>16003</th>
      <td>Amaro</td>
      <td>Coming Soon!!!; Katri</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>07 - Coming Soon!!!; Katri - Amaro.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>7.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>364.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>16004</th>
      <td>Batavia (Abstract Vision Remix)</td>
      <td>Kiyoi &amp; Eky</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>08 - Kiyoi &amp; Eky - Batavia (Abstract Vision Remix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>8.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>334.0</td>
      <td>NONE_KEY</td>
      <td>138.000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>16005</th>
      <td>Autobahn (Volcano On Mars Remix)</td>
      <td>Will Atkinson</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>09 - Will Atkinson - Autobahn (Volcano On Mars Remix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>9.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>228.0</td>
      <td>NONE_KEY</td>
      <td>143.008</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>16006</th>
      <td>Rainbow (Extended Mix)</td>
      <td>Oraw; Cameron Mo</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>10 - Oraw; Cameron Mo - Rainbow (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>10.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>289.0</td>
      <td>NONE_KEY</td>
      <td>138.000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>16007</th>
      <td>More Directions (Shadow Chronicles Remix)</td>
      <td>Protoculture</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>11 - Protoculture - More Directions (Shadow Chronicles Remix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>11.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>9.0</td>
      <td>488.0</td>
      <td>NONE_KEY</td>
      <td>142.000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>16008</th>
      <td>In Bloom (Extended Mix)</td>
      <td>Sean Tyas</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>12 - Sean Tyas - In Bloom (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>12.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>481.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>16009</th>
      <td>Dark Dimension (Extended Mix)</td>
      <td>Rysto</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>13 - Rysto - Dark Dimension (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>13.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>417.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>16010</th>
      <td>Paradigm</td>
      <td>Timelock; Miper</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>14 - Timelock; Miper - Paradigm.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>14.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>338.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>16011</th>
      <td>Wild Spirit</td>
      <td>Sound Of Champion; Maison &amp; Dragen; Charli Kornblum</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>15 - Sound Of Champion; Maison &amp; Dragen; Charli Kornblum - Wild Spirit.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>15.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>238.0</td>
      <td>NONE_KEY</td>
      <td>150.000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>16012</th>
      <td>Power (Extended Mix)</td>
      <td>Formula None</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>16 - Formula None - Power (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>16.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>505.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>16013</th>
      <td>Voltage</td>
      <td>Morten Granau</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>17 - Morten Granau - Voltage.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>17.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>470.0</td>
      <td>NONE_KEY</td>
      <td>135.000</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>16014</th>
      <td>Cafe</td>
      <td>LUM1NA; Zinkibaru</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>18 - LUM1NA; Zinkibaru - Cafe.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>18.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>348.0</td>
      <td>NONE_KEY</td>
      <td>138.000</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>16015</th>
      <td>Beginning of Time</td>
      <td>Suduaya; StarLab</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>19 - Suduaya; StarLab - Beginning of Time.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>19.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>7.0</td>
      <td>520.0</td>
      <td>NONE_KEY</td>
      <td>142.000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>16016</th>
      <td>We Gonna Groove</td>
      <td>Interactive Noise</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>20 - Interactive Noise - We Gonna Groove.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>20.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>5.0</td>
      <td>312.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>16017</th>
      <td>Pure Light</td>
      <td>Yestermorrow</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>21 - Yestermorrow - Pure Light.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>21.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>412.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>16018</th>
      <td>Mad Ancestors</td>
      <td>Klopfgeister; Mind Void; Jost H. Walter</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>22 - Klopfgeister; Mind Void; Jost H. Walter - Mad Ancestors.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>22.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>345.0</td>
      <td>NONE_KEY</td>
      <td>138.000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>16019</th>
      <td>Our Existence (Extended Mix)</td>
      <td>Modgen</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>23 - Modgen - Our Existence (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>23.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>11.0</td>
      <td>511.0</td>
      <td>NONE_KEY</td>
      <td>142.000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>16020</th>
      <td>Shadows</td>
      <td>Neelix</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>24 - Neelix - Shadows.mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>24.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>237.0</td>
      <td>NONE_KEY</td>
      <td>142.000</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>16021</th>
      <td>Stranger Light (Extended Mix)</td>
      <td>Fisical Project</td>
      <td>/:music/:psychedelik_new/:VA - Psytrance 2020 Vol.1 (2020) MP3/:</td>
      <td>25 - Fisical Project - Stranger Light (Extended Mix).mp3</td>
      <td>Psytrance 2020 Volume 1</td>
      <td>25.0</td>
      <td>Dance; Trance</td>
      <td>2020-11-21</td>
      <td>NaT</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>445.0</td>
      <td>NONE_KEY</td>
      <td>140.000</td>
      <td>20.0</td>
    </tr>
  </tbody>
</table>
</div>



## Round 2


```python
datanew["genre"].replace(to_replace='Psy Prog', value='Progressive Psytrance', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace='Full-On Night', value='Full On', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace='Psy-Trance, Progressive Trance', value='-Psytrance',inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(Alternativ).*', value='-Hip-Hop', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(Progressive).*', value='-Progressive Psytrance', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(Amb).*', value='-Ambient', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'.*(Goa).*', value='-Goa Trance', regex=True ,inplace=True)
```


```python
datanew["genre"].replace(to_replace=r'^(Psy).*', value='-Psytrance', regex=True ,inplace=True)
```


```python
len(datanew.genre.unique())
```




    56




```python
sorted(datanew.genre.unique())
```




    ['-Ambient',
     '-Goa Trance',
     '-Hip-Hop',
     '-House',
     '-Progressive Psytrance',
     '-Psychedelik',
     '-Psytrance',
     '?',
     'Blues',
     'Boker',
     'Breaks',
     'Classic Rock',
     'Crossover',
     'Dance',
     'Dance/Electronic',
     'Dance; Trance',
     'Darkpsy',
     'Disco',
     'Downtempo',
     'Dub, Downtempo',
     'Easy Listening',
     'Electronic',
     'Electronica',
     'Full On',
     'Gangsta',
     'Hardcore',
     'Indie',
     'Industrial',
     'Instrumental',
     'Lo-Fi',
     'NONE_GENRE',
     'New Age',
     'Noise',
     'Other',
     'Podcast',
     'Pop',
     'R&B',
     'Reggae',
     'Rock',
     'Soundtrack',
     'Space',
     'Suburban Noize Records',
     'Tech house',
     'Techno',
     'Tipparade',
     'Trance',
     'Trance, Psy Trance',
     'Trip-Hop',
     'Unknown',
     '[Pop',
     'electronic',
     'genre',
     'pop',
     'psychedelic',
     'psytrance, goa',
     'user defined']




```python
datanew[50:100]
```




<div class="wrapper_">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>artist</th>
      <th>directory</th>
      <th>arch</th>
      <th>album</th>
      <th>no_track</th>
      <th>genre</th>
      <th>import_date</th>
      <th>release_date</th>
      <th>ranking</th>
      <th>playcount</th>
      <th>playtime</th>
      <th>key_name</th>
      <th>bpm</th>
      <th>key</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>50</th>
      <td>Soma (Veda Mix)</td>
      <td>Entheogenic</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Entheogenic_-_Soma_Veda_Mix-2013/:</td>
      <td>Entheogenic - Soma (Veda Mix).mp3</td>
      <td>NONE_TITLE</td>
      <td>1.0</td>
      <td>-Psychedelik</td>
      <td>2013-05-29</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>684.0</td>
      <td>Fm</td>
      <td>132.9980</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>51</th>
      <td>J.Viewz-Rivers And Homes</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>01-j.viewz-j.viewz-rivers_and_homes-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>1.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>166.0</td>
      <td>G#</td>
      <td>77.9914</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>52</th>
      <td>J.Viewz-Salty Air</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>02-j.viewz-j.viewz-salty_air-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>2.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>256.0</td>
      <td>Eb</td>
      <td>91.8362</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>53</th>
      <td>J.Viewz-Wht U Hv For The Sun</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>03-j.viewz-j.viewz-wht_u_hv_for_the_sun-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>3.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>256.0</td>
      <td>Cm</td>
      <td>86.4871</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>54</th>
      <td>J.Viewz-Prelude</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>04-j.viewz-j.viewz-prelude-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>4.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>136.0</td>
      <td>Am</td>
      <td>112.4930</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>55</th>
      <td>J.Viewz-Oh Something's Quiet</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>05-j.viewz-j.viewz-oh_somethings_quiet-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>5.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>249.0</td>
      <td>D</td>
      <td>149.9810</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>56</th>
      <td>J.Viewz-Meantime (Little Notes)</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>06-j.viewz-j.viewz-meantime_(little_notes)-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>6.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>295.0</td>
      <td>Gbm</td>
      <td>129.9800</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>57</th>
      <td>J.Viewz-This City Means No Love</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>07-j.viewz-j.viewz-this_city_means_no_love-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>7.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>221.0</td>
      <td>Cm</td>
      <td>95.9847</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>58</th>
      <td>J.Viewz-Building A Home</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>08-j.viewz-j.viewz-building_a_home-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>8.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>231.0</td>
      <td>C</td>
      <td>81.0003</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>59</th>
      <td>J.Viewz-Far Too Close</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>09-j.viewz-j.viewz-far_too_close-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>9.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>347.0</td>
      <td>Am</td>
      <td>84.9893</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>60</th>
      <td>J.Viewz-Come Back Down</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>10-j.viewz-j.viewz-come_back_down-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>10.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>289.0</td>
      <td>C</td>
      <td>97.4852</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>61</th>
      <td>J.Viewz-About The Sea</td>
      <td>J.Viewz</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:</td>
      <td>11-j.viewz-j.viewz-about_the_sea-ilu.mp3</td>
      <td>Rivers And Homes</td>
      <td>11.0</td>
      <td>Reggae</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>382.0</td>
      <td>Ab</td>
      <td>131.9800</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>62</th>
      <td>Build A Fire</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Build_A_Fire_320.mp3</td>
      <td>Random Precision</td>
      <td>13.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>327.0</td>
      <td>Ebm</td>
      <td>95.0003</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>63</th>
      <td>Dontmakemedance</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Dontmakemedance_320.mp3</td>
      <td>Random Precision</td>
      <td>11.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>338.0</td>
      <td>Em</td>
      <td>152.0010</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>64</th>
      <td>Dub Mythology</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Dub_Mythology_320.mp3</td>
      <td>Random Precision</td>
      <td>4.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>356.0</td>
      <td>Gm</td>
      <td>89.0932</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>65</th>
      <td>Evaluation (remix)</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Evaluation_(remix)_320.mp3</td>
      <td>Random Precision</td>
      <td>10.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>305.0</td>
      <td>Fm</td>
      <td>151.9990</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>66</th>
      <td>Hole In My Sitar</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Hole_In_My_Sitar_320.mp3</td>
      <td>Random Precision</td>
      <td>3.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>251.0</td>
      <td>Gbm</td>
      <td>90.0001</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>67</th>
      <td>Is This Stuff Real</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Is_This_Stuff_Real_320.mp3</td>
      <td>Random Precision</td>
      <td>7.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>357.0</td>
      <td>Fm</td>
      <td>130.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>68</th>
      <td>Little Mountain</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Little_Mountain_320.mp3</td>
      <td>Random Precision</td>
      <td>9.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>333.0</td>
      <td>Abm</td>
      <td>85.9999</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>69</th>
      <td>Never Trustafarian</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Never_Trustafarian_320.mp3</td>
      <td>Random Precision</td>
      <td>1.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>268.0</td>
      <td>Gbm</td>
      <td>131.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>70</th>
      <td>On The Spot</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_On_The_Spot_320.mp3</td>
      <td>Random Precision</td>
      <td>6.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>175.0</td>
      <td>Abm</td>
      <td>116.9990</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>71</th>
      <td>Out Of The Box</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Out_Of_The_Box_320.mp3</td>
      <td>Random Precision</td>
      <td>2.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>16.0</td>
      <td>365.0</td>
      <td>Em</td>
      <td>106.0000</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>72</th>
      <td>Parc Guell</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Parc_Guell_320.mp3</td>
      <td>Random Precision</td>
      <td>8.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>12.0</td>
      <td>338.0</td>
      <td>F</td>
      <td>110.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>73</th>
      <td>Return Of The Grasshopper</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Return_Of_The_Grasshopper_320.mp3</td>
      <td>Random Precision</td>
      <td>12.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>322.0</td>
      <td>Gm</td>
      <td>134.0000</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>74</th>
      <td>Sunset Smile</td>
      <td>Kuba</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:</td>
      <td>Kuba_-_Sunset_Smile_320.mp3</td>
      <td>Random Precision</td>
      <td>5.0</td>
      <td>-Ambient</td>
      <td>2012-07-15</td>
      <td>2012-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>263.0</td>
      <td>Am</td>
      <td>113.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>75</th>
      <td>Don't Hold Back (Russ Liquid Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>01 - Don't Hold Back (Russ Liquid Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>1.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>219.0</td>
      <td>Bm</td>
      <td>132.0000</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>76</th>
      <td>Ripple (AMB Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>02 - Ripple (AMB Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>2.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>290.0</td>
      <td>Bbm</td>
      <td>97.9994</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>77</th>
      <td>Wiggle Sticks (Fort Knox Five Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>03 - Wiggle Sticks (Fort Knox Five Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>3.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>301.0</td>
      <td>Bbm</td>
      <td>115.0000</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>78</th>
      <td>Fizzle Tickler (Spoonbill Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>04 - Fizzle Tickler (Spoonbill Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>4.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>232.0</td>
      <td>Fm</td>
      <td>109.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>79</th>
      <td>Wiggle Sticks (Infected Mushroom Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>05 - Wiggle Sticks (Infected Mushroom Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>5.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>5.0</td>
      <td>385.0</td>
      <td>Db</td>
      <td>127.9990</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>80</th>
      <td>Ripple (Dirtyloud Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>06 - Ripple (Dirtyloud Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>6.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>228.0</td>
      <td>Fm</td>
      <td>86.0000</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>81</th>
      <td>Ripple (Organikismness Remix)</td>
      <td>Opiuo</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:</td>
      <td>07 - Ripple (Organikismness Remix).mp3</td>
      <td>Butternut Slap Remixed EP</td>
      <td>7.0</td>
      <td>Electronic</td>
      <td>2013-12-14</td>
      <td>2013-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>453.0</td>
      <td>Em</td>
      <td>140.0000</td>
      <td>16.0</td>
    </tr>
    <tr>
      <th>82</th>
      <td>One Day I Wish To Have This Kind Of Time</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>01 - One Day I Wish To Have This Kind Of Time.mp3</td>
      <td>Mir</td>
      <td>1.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>514.0</td>
      <td>C</td>
      <td>135.9990</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>83</th>
      <td>Adrift In Hilbert Space</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>02 - Adrift In Hilbert Space.mp3</td>
      <td>Mir</td>
      <td>2.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>491.0</td>
      <td>D</td>
      <td>140.0010</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>84</th>
      <td>Owl Stretching Time</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>03 - Owl Stretching Time.mp3</td>
      <td>Mir</td>
      <td>3.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>462.0</td>
      <td>Bm</td>
      <td>146.0000</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>85</th>
      <td>Squirrel and Biscuits</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>04 - Squirrel and Biscuits.mp3</td>
      <td>Mir</td>
      <td>4.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>363.0</td>
      <td>G</td>
      <td>84.9998</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>86</th>
      <td>A Nice Little Place</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>05 - A Nice Little Place.mp3</td>
      <td>Mir</td>
      <td>5.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>434.0</td>
      <td>Dm</td>
      <td>106.6650</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>87</th>
      <td>Mouse Eating Cheese</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>06 - Mouse Eating Cheese.mp3</td>
      <td>Mir</td>
      <td>6.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>10.0</td>
      <td>459.0</td>
      <td>E</td>
      <td>120.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>88</th>
      <td>The Aubergine of The Sun</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>07 - The Aubergine of The Sun.mp3</td>
      <td>Mir</td>
      <td>7.0</td>
      <td>NONE_GENRE</td>
      <td>2013-12-14</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>610.0</td>
      <td>F</td>
      <td>90.9998</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>89</th>
      <td>One Day I Wish To Have This Ki</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>cacho- One Day I Wish To Have This Kind Of Time.mp3</td>
      <td>Mir</td>
      <td>NaN</td>
      <td>NONE_GENRE</td>
      <td>2012-07-15</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>143.0</td>
      <td>C</td>
      <td>136.0020</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>90</th>
      <td>One Day I Wish To Have This Ki</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>cacho2- One Day I Wish To Have This Kind Of Time.mp3</td>
      <td>Mir</td>
      <td>NaN</td>
      <td>NONE_GENRE</td>
      <td>2012-07-15</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>61.0</td>
      <td>C</td>
      <td>136.0050</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>91</th>
      <td>One Day I Wish To Have This Ki</td>
      <td>Ott</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:</td>
      <td>cacho3- One Day I Wish To Have This Kind Of Time.mp3</td>
      <td>Mir</td>
      <td>NaN</td>
      <td>NONE_GENRE</td>
      <td>2012-07-15</td>
      <td>2011-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>71.0</td>
      <td>C</td>
      <td>136.0040</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>92</th>
      <td>Dorset Perception</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>01-Shpongle_-_Dorset_Perception-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>1.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>493.0</td>
      <td>E</td>
      <td>120.0000</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>93</th>
      <td>Star Shpongled Banner</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>02-Shpongle_-_Star_Shpongled_Banner-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>2.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>504.0</td>
      <td>Gbm</td>
      <td>129.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>94</th>
      <td>A New Way to Say 'Hooray!'</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>03-Shpongle_-_A_New_Way_to_Say_Hooray-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>3.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>513.0</td>
      <td>NONE_KEY</td>
      <td>77.7514</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>95</th>
      <td>Room 23</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>04-Shpongle_-_Room_23-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>4.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>306.0</td>
      <td>Dm</td>
      <td>139.9990</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>96</th>
      <td>My Head Feels Like A Frisbee</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>05-Shpongle_-_My_Head_Feels_Like_A_Frisbee-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>5.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>533.0</td>
      <td>Am</td>
      <td>136.0000</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>97</th>
      <td>Shpongleyes</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>06-Shpongle_-_Shpongleyes-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>6.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>537.0</td>
      <td>Gm</td>
      <td>87.9998</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>98</th>
      <td>Once Upon The Sea Of Blissful</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>07-Shpongle_-_Once_Upon_The_Sea_Of_Blissful_Awareness-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>7.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>451.0</td>
      <td>Gbm</td>
      <td>90.0000</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>99</th>
      <td>Around The World In A Tea Daze</td>
      <td>Shpongle</td>
      <td>/:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:</td>
      <td>08-Shpongle_-_Around_The_World_In_A_Tea_Daze-PsyCZ.mp3</td>
      <td>Tales Of The Inexpressible</td>
      <td>8.0</td>
      <td>-Ambient</td>
      <td>2013-12-14</td>
      <td>2001-01-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>682.0</td>
      <td>Em</td>
      <td>150.0010</td>
      <td>16.0</td>
    </tr>
  </tbody>
</table>
</div>



# Directorios a excluir


```python
len(datanew.directory.unique())
```




    1371




```python
for i in datanew.directory.unique():
    print(i)
```

    /:ProgramData/:Native Instruments/:Traktor 2/:Factory Sounds/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:Entheogenic_-_Soma_Veda_Mix-2013/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:J.Viewz-Rivers_And_Homes-2011-iLU/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:Kuba-Random_Precision_2012/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:Opiuo - Butternut Slap Remixed (2013) [MP3 320 - Stepherd]/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:Ott - Mir (2011)/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:Shpongle_-_Tales_Of_The_Inexpressible-(Retail)-(256kbps)-2001-PsyCZ/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:Slackbaba - Perverting Mankind (2010)/:
    /:Users/:C/:Music/:Psychedelik/:AMBIENT/:VA-PAZ-Compiled by Ovnimoon-BR/:
    /:Users/:C/:Music/:Psychedelik/:DARK/:Fungus Funk - Kremlin Gremlin (2012)/:
    /:Users/:C/:Music/:Psychedelik/:DARK/:V.A. - Shri Maharaj (Compiled & Mixed by Goa Gil)/:
    /:Users/:C/:Music/:Psychedelik/:
    /:Users/:C/:Music/:Psychedelik/:FULL-ON/:
    /:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum.-Co Lab Part 01 2011/:
    /:Users/:C/:Music/:Psychedelik/:FULL-ON/:Absolum_Inside_the_Sphere_2004/:
    ...
    /:music/:psychedelik_new/:VA - Talents Showcase Vol. 1 (2020)/:
    
directorios a eliminar
/:Users/:C/:Music/:Traktor/:Recordings/:
/:Users/:C/:Downloads/:
/:Users/:C/:Music/:PODCAST/:

/:Users/:C/:Music/:Traktor/:Recordings/:GOA_TRANCE/:
/:Users/:C/:Music/:Traktor/:Recordings/:PSY_1/:
/:Users/:C/:Music/:Traktor/:Recordings/:REMADE/:

```python
death_list = ['/:Users/:C/:Music/:Traktor/:Recordings/:','/:Users/:C/:Downloads/:','/:Users/:C/:Music/:PODCAST/:',
              '/:Users/:C/:Music/:Traktor/:Recordings/:GOA_TRANCE/:','/:Users/:C/:Music/:Traktor/:Recordings/:PSY_1/:',
              '/:Users/:C/:Music/:Traktor/:Recordings/:REMADE/']
```


```python
dirs_to_remove = datanew['directory'].isin(death_list)
```


```python
dirs_to_remove
```




    0        False
    1        False
    2        False
    3        False
    4        False
    5        False
    6        False
    7        False
    8        False
    ...
    16430     True
    16431     True
    16432     True
    Name: directory, dtype: bool




```python
datanew = datanew.loc[~dirs_to_remove]
```


```python
len(datanew)
```




    16216



# EXPORT


```python
datanew.to_csv('coll.csv',sep=";")
```


```python
dataExport = datanew.drop(columns=["directory","arch"])
```


```python
dataExport.columns
```




    Index(['title', 'artist', 'album', 'no_track', 'genre', 'import_date',
           'release_date', 'ranking', 'playcount', 'playtime', 'key_name', 'bpm',
           'key'],
          dtype='object')




```python
dataExport.to_csv('coll.csv',sep=";")
```


```python
dataExport.to_json(r'./coll.json')
```


