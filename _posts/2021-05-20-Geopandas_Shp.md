---
layout: post
title:  "Plotting archivos shp con Geopandas"
date:   2021-05-20 22:25:42 +0200
categories: jupyterNb python
---
# Un cuaderno para plotear mapas en formato shp.


```python
# Procesado y representación gráfica de datos
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt 
%matplotlib inline
# Herramienta de zoom para el mapa
import mpld3
mpld3.enable_notebook()  
# Menus de interactividad con el mapa
import ipywidgets as widgets
```


```python
# lista para suminitrar al widget.Dropdown mapaW , nombre a mostrar y valor a enviar
lista_archivos = [('BCN0502P_ENT_POB_point.shp', 0),('BCN0567P_INS_REC_P_point.shp', 1),('BCN0558P_YAC_ARQ_point.shp', 2),
                   ('BCN0537P_CUEVA_point.shp', 3),('BCN0632L_ITINER_line.shp', 4)]
```


```python
# Crea string con el nombre del archivo a cargar los archivos están en : ./vector/
def creaNombre(x):
    nombre_arch = lista_archivos[x]
    return nombre_arch[0] # Solo el primer valor (nombre)
```


```python
# carga el mapa y lo muestra es invocada desde el widget devuelto por select_mapa()
def muestra_mapa(capa):
    
    under = gpd.read_file('vector/BCN0901S_MAR_HOJ_polygon.shp') # contorno sobre el que se muestran los datos
    mapa = gpd.read_file(N_mapa)
    # print('capa' + mapa.ETIQUETA[mapa['ID']==capa])
    
    fig, ax = plt.subplots(figsize=(10,10))
    
    under.plot(ax=ax, alpha=0.3,color='green')
    if capa=='All':
        mapa.plot(ax=ax, alpha=0.3,color='red')
        plt.legend([N_mapa[7:-4]],loc=0);
        
    else:
        mapa[mapa['ID']==capa].plot(ax=ax, alpha=1,color='plum')
        plt.legend(mapa.ETIQUETA[mapa['ID']==capa],loc=0);
    
    plt.title(N_mapa[7:-4], fontsize=15,fontweight='bold')
        
    return plt.show();
```


```python
# Función con la que interactua el widget capaW,
# devuelve el widget capaW cargado con las opciones que corresponden en base al mapa cargado.
N_mapa ='' 
def select_mapa(mapa): 
    lista_capas = [('All','All')]
    
    global N_mapa 
    mapaActual = creaNombre(mapa) 
    N_mapa = 'vector/'+mapaActual 
    mapa = gpd.read_file(N_mapa)
   
    try:
        lista_capas += list(zip(mapa.ETIQUETA,mapa.ID ))
    except:
        print('MAL')
    capaW = widgets.Dropdown(options=lista_capas,description='CAPA:')
    widgets.interact(muestra_mapa ,capa=capaW) # <-- is this the proper way to do this?
    return    
```


```python
# El widget que pone todo en movimiento
mapaW = widgets.Dropdown(options=lista_archivos ,description='MAPA:')
widgets.interact(select_mapa ,mapa=mapaW)
```


    

# Mapa interactivo <br>
<!--excerpt.start-->

{%- include fig_1.html -%}


## BTN25 2006-2019 CC-BY 4.0 [ign.es ]( http://www.ign.es "Instituto geográfico nacional") 
<hr>

{% include callout.html content="Explorar el notebook en binder: &nbsp;[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/czg-es/Geopandas_shp/main) " type="note" %}

<!--excerpt.end-->

<div style="text-align: right"> <h1> CZG 2021</h1>  </div>


