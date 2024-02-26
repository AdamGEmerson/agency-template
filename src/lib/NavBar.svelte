<script lang="ts">

    import {IconMenuDeep, IconX} from "@tabler/icons-svelte";
import {slide, fly} from "svelte/transition";

let scrollY = 0;

let menuOpen = false;
const handleMenuClick = () => {
    menuOpen = !menuOpen;
}

</script>

{#if scrollY < 32}
<div in:fly={{y: -10, duration:500}} out:fly={{y: -10, duration: 500}} class="flex flex-row justify-between fixed top-0 right-0 left-0 p-8 px-16">
    <div class="logo h-16 w-16 bg-primary rounded-full flex justify-center items-center">
        <div class="text-3xl font-bold">ud</div>
    </div>
    <div class="hidden md:flex text-white gap-8 items-center">
        <a class="hover:text-primary" href="#services">Services</a>
        <a class="hover:text-primary" href="#blog">Blog</a>
        <a class="hover:text-primary" href="#about">About</a>
        <a class="bg-primary px-4 p-2 text-black font-semibold hover:bg-white hover:text-primary" href="#contact">Contact</a>
    </div>
    <div class="md:hidden flex items-center">
        <button class="text-white" id="menu" on:click|preventDefault={handleMenuClick}>
            <IconMenuDeep />
        </button>
    </div>
    {#if menuOpen}
        <div class="w-full h-full fixed top-0 left-0 z-40" on:click={handleMenuClick} />
        <div transition:slide={{axis: 'x'}} class="md:hidden fixed top-0 right-0 w-2/3 h-[100vh] bg-black bg-opacity-90 backdrop-blur z-50 flex flex-col items-end p-16 gap-8">
            <button class="text-white" on:click={handleMenuClick}>
                <IconX />
            </button>
            <div class="flex flex-col gap-8 w-full">
                <a class="bg-white px-4 p-2 text-black font-semibold" href="#services">Services</a>
                <a class="bg-white px-4 p-2 text-black font-semibold" href="#blog">Blog</a>
                <a class="bg-white px-4 p-2 text-black font-semibold" href="#about">About</a>
                <a class="bg-primary px-4 p-2 text-black font-semibold" href="#contact">Contact</a>
            </div>
        </div>
    {/if}
</div>
{/if}

<svelte:window bind:scrollY />