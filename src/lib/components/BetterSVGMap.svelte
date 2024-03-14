<script lang="ts">
  import { onMount } from 'svelte';
  import patternSvg from "$lib/components/checkerboard.svg";
  import {cubicOut, sineInOut} from 'svelte/easing';
  import {tweened} from "svelte/motion";

  let feImage1: SVGFEImageElement;
  let feImage2: SVGFEImageElement;
  let svgBackground: SVGSVGElement;
  let warp: string;

  let x = 0;
  let y = 0;

  let warpOffset = -350;
  let direction = 1;
  let breatheMs = 4000;
  let innerRing = 50;

  let value = tweened(100, {
    duration: breatheMs,
    easing: sineInOut,
  });

  value.set(innerRing)

  setInterval(() => {
    if (direction === 1) {
      value.set(100);
      direction = -1;
    } else {
      value.set(innerRing);
      direction = 1;
    }
  }, breatheMs);

  let tweenValue: number;
  value.subscribe((v) => {
    tweenValue = v;
  });

  let svgCoords: number[] = [0, 0];
  const onMouseMove = (e: MouseEvent) => {
    svgCoords = screen2SVG(e.clientX, e.clientY);
    console.log(e.clientX, e.clientY);
  }

  $: console.log('tweenValue', tweenValue);

  const map = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" class="displacementmap" id="absolute-displacementmap" width="256" height="256" preserveAspectRatio="none">
        <defs>
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
    </svg>`);
  $: warp = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" class="displacementmap" id="absolute-displacementmap" width="50" height="50" preserveAspectRatio="none">
          <defs>
              <style type="text/css">
                  .gradient {
                      fill: url(#gradient);
                      }
              </style>

              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style="stop-color:rgb(128,0,128); stop-opacity:1" />
                  <stop offset="${tweenValue}%" style="stop-color:rgb(${tweenValue},0,${255 - tweenValue}); stop-opacity:0" />
              </radialGradient>
          </defs>
          <rect width="100%" height="100%" x="0" y="0" fill="url(#gradient)"/>
      </svg>`);

  // Reactively assign href attributes to the feImage elements once they load in the dom.
  $: if (feImage1) feImage1.setAttribute('href', `data:image/svg+xml;charset=utf-8,${map}`);
  $: if (feImage2) feImage2.setAttribute('href', `data:image/svg+xml;charset=utf-8,${warp}`);

  let pt: DOMPoint;
  $: if (svgBackground) pt = svgBackground.createSVGPoint();

  // Reactively move the svg to mouse position
  $: if (feImage2)  {
    feImage2.setAttribute('x', `${svgCoords[0] + warpOffset}`);
    feImage2.setAttribute('y', `${svgCoords[1] + warpOffset}`);
  }

  const screen2SVG = (x = 0, y = 0) => {
    pt.x = x;
    pt.y = y;

    if (!svgBackground) return [0, 0];
    let screenCtm = svgBackground.getScreenCTM();

    if (!screenCtm) return [0, 0];
    const svgPt = pt.matrixTransform(screenCtm.inverse());

    return [svgPt.x, svgPt.y];
  }
</script>

<svg bind:this={svgBackground} id="svgBackground" width="100vw" height="100vh" viewBox="0 0 3200 1800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="dm-filter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feImage bind:this={feImage1} id="absmap" x="0" y="-600" width="3000" height="3000" result="FEIMG_ABS" />
      <feImage bind:this={feImage2} id="magnifyer" x="100%" y="100%" width="700" height="700" result="FEIMG_MAGNIFYER" />

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
    .pattern-img {
        cursor: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: .2;
        width: 100%;
        height: 100%;
    }

    #filtered {
        -webkit-filter: url(#dm-filter);
        filter: url(#dm-filter);
    }
</style>

<svelte:window on:mousemove={onMouseMove} />
