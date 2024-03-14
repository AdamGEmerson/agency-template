<script lang="ts">
  import { onMount } from 'svelte';
  import map from './map.svg';
  import Checkerboard from "$lib/components/Checkerboard.svelte";
  import pattern from "$lib/components/pattern_checkerboard.png";
  import patternSvg from "$lib/components/checkerboard.svg";

  let x = 0;
  let y = 0;

  const onMouseMove = (e) => {
    console.log(e.clientX, e.clientY);
  }
  onMount(() => {
      const magnifyer = `
<svg xmlns="http://www.w3.org/2000/svg" class="displacementmap" id="absolute-displacementmap" width="50" height="50" preserveAspectRatio="none">
    <defs>
        <style type="text/css">
            .gradient {
                fill: url(#gradient);
                }
        </style>

        <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="20%" style="stop-color:rgb(128,0,128); stop-opacity:1" />
            <stop offset="40%" style="stop-color:rgb(200,0,200); stop-opacity:0" />
            <stop offset="80%" style="stop-color:rgb(128,0,128); stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(10,0,10); stop-opacity:0" />
        </radialGradient>
    </defs>
    <rect width="100%" height="100%" x="0" y="0" fill="url(#gradient)"/>
</svg>`;
      const absoluteMap = `
<svg xmlns="http://www.w3.org/2000/svg" class="displacementmap" id="absolute-displacementmap" width="256" height="256" preserveAspectRatio="none">
    <defs>
        <style type="text/css">
            .red-gradient {
                fill: url(#red-gradient);
                }

                .blue-gradient {
                    fill: url(#blue-gradient);
                    mix-blend-mode: screen;
                }
        </style>

        <linearGradient id="red-gradient" x1="0" x2="1" y1="0" y2="0" color-interpolation="sRGB" gradientUnits="objectBoundingBox">
            <stop offset="0%" stop-color="#FF0000" stop-opacity="1" />
            <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1" color-interpolation="sRGB" gradientUnits="objectBoundingBox">
            <stop offset="0%" stop-color="#0000FF" stop-opacity="1" />
            <stop offset="1" stop-color="#0000FF" stop-opacity="0" />
        </linearGradient>
    </defs>
    <rect width="100%" height="100%" x="0" y="0" fill="black" />
    <rect id="red-gradient-rect" width="100%" height="100%" x="0" y="0" class="red-gradient"/>
    <rect id="blue-gradient-rect" width="100%" height="100%" x="0" y="0" class="blue-gradient"/>
</svg>`;

      const feImage1 = document.querySelector('#absmap');
      const feImage2 = document.querySelector('#magnifyer');
      const map = encodeURIComponent(absoluteMap);
      const mag = encodeURIComponent(magnifyer);
      const img = document.getElementById('filteredimage');
      const wrapper = document.getElementById('wrapper');
      const filtered = document.getElementById('filtered');
      const marsSVG = document.getElementById('mars_svg');
      const pt = marsSVG.createSVGPoint();
      const xMin = 340;
      const xMax = 2710;
      const yMin = 0;
      const yMax = 1800;
      const magOffset = -300;
      let isMoving = false;
      let speed = 30;
      let delta = 0;
      let svgCoords, ySVG, xInverse, xOld, xPos;

      const screen2SVG = (x = 0, y = 0) => {
        pt.x = x;
        pt.y = y;

        const svgPt = pt.matrixTransform(
          marsSVG.getScreenCTM().inverse()
        );

        return [svgPt.x, svgPt.y];
      }
      const setFilter = () => {
          filtered.classList.add('filtered');
          feImage1.setAttribute('href', `data:image/svg+xml;charset=utf-8,${map}`);
          feImage2.setAttribute('href', `data:image/svg+xml;charset=utf-8,${mag}`);
      }

      if (!img.complete) {
          img.onload = (e) => {
              setFilter();
          }
      } else {
          setFilter();
      }

      // const slide = () => {
      //     const threshold = 0.75;
      //
      //     delta -= delta / speed;
      //     xPos = xOld + delta;
      //     wrapper.style.transform = `translate(${xPos}px, 0)`;
      //
      //     if (Math.abs(delta) > threshold) {
      //         requestAnimationFrame(slide);
      //         isMoving = true;
      //         xOld = xPos;
      //     } else {
      //         isMoving = false;
      //     }
      // }

      const move = (e) => {
          svgCoords = screen2SVG(e.clientX, e.clientY);

          if (!(svgCoords[0] < xMax && svgCoords[0] > xMin) || !(svgCoords[1] < yMax && svgCoords[1] > yMin)) {
              return;
          }

          xInverse = svgCoords[0] * -1;
          delta = (xInverse - xOld) / speed;

          if (!isMoving) {
              // slide();
          }

          feImage2.setAttribute('x', svgCoords[0] + magOffset);
          feImage2.setAttribute('y', svgCoords[1] + magOffset);
      }

      svgCoords = screen2SVG(Math.floor(img.offsetLeft));
      xInverse = svgCoords[0] * -1;
      xOld = svgCoords[0];
      xPos = xOld;

      wrapper.style.transform = `translate(${svgCoords}px, 0)`;
      marsSVG.addEventListener('pointermove', move);
  })
</script>

<svg id="mars_svg" width="100%" height="100%" viewBox="0 0 3000 1800" >
  <defs>
    <filter id="dm-filter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feImage id="absmap" x="0" y="-600" width="3000" height="3000" result="FEIMG_ABS" />
      <feImage id="magnifyer" x="100%" y="100%" width="700" height="700" result="FEIMG_MAGNIFYER" />

      <feMerge result="MERGE_ALL">
        <feMergeNode in="FEIMG_ABS" />
        <feMergeNode in="FEIMG_MAGNIFYER" />
      </feMerge>

      <feDisplacementMap in="SourceGraphic" in2="MERGE_ALL" scale="-100" xChannelSelector="R" yChannelSelector="B" />
    </filter>
  </defs>
  <g id="filtered">
    <g id="wrapper">
      <foreignObject width="100%" height="100%" id="filteredd">
        <picture>
          <img class="pattern-img" id="filteredimage" src={patternSvg} />
        </picture>
      </foreignObject>
    </g>
  </g>
</svg>

<style>
    /*svg {*/
    /*    cursor: none;*/
    /*    display: block;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    max-width: 666px;*/
    /*    max-height: 400px;*/
    /*    flex: 0 0 auto;*/
    /*    overflow: hidden;*/
    /*}*/

    #mars_svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .pattern-img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: .2;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background-color: red;
    }

    #filtered {
        -webkit-filter: url(#dm-filter);
        filter: url(#dm-filter);
    }
</style>

<svelte:window on:mousemove={onMouseMove} />
```
