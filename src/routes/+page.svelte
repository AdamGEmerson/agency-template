<script>
    import {onMount} from "svelte";
    import {blur, fly} from "svelte/transition";
    import {quartOut} from "svelte/easing";
    import BetterSVGMap from "$lib/components/BetterSVGMap.svelte";

    let mounted = false;
    onMount(() => {
        mounted = true;
    })
</script>

{#if mounted}
    <div class="flex w-full z-10 items-center h-[80%] px-16">
        <div class="flex flex-col gap-8 py-32 md:px-8" transition:blur={{delay: 800, duration: 1000, easing: quartOut}}>
            <h1 class="font-serif font-medium text-8xl text-secondary text-center md:text-left w-full md:w-3/4">
                Break the mold.
            </h1>
            <h2 class="text-md md:text-lg xl:text-2xl text-center md:text-left text-black bg-white flex items-center pl-8 p-2 w-8/12">
                With websites that create conversations.
            </h2>
<!--            <a class="self-center md:self-start bg-black text-center font-semibold px-4 md:px-8 p-2 md:p-4 w-36 md:w-48 text-xl hover:bg-primary text-white"-->
<!--                href="#contact"-->
<!--            >-->
<!--                Let's Chat-->
<!--            </a>-->
        </div>
    </div>
    <div class="absolute bottom-10 left-0 right-0 flex items-center justify-center w-full text-white text-sm"
         transition:blur={{delay: 1200, duration: 1000, easing: quartOut}}>
        <a href="mailto:hello@oddbreak.digital" class="hover:underline">hello@oddbreak.digital</a>
    </div>

    <div class="w-full h-80 bg-white shadow" transition:fly={{y: 100, duration: 500, delay: 1200}}>

    </div>


    <div class="background" transition:blur>
        <BetterSVGMap />
    </div>
{/if}

<style>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -10;
    }
</style>