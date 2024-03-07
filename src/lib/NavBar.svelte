<script lang="ts">

    import {IconMenuDeep, IconX} from "@tabler/icons-svelte";
import {slide, fly} from "svelte/transition";
    import LogoWithLine from "$lib/LogoWithLine.svelte";
    import {onMount} from "svelte";

let scrollY = 0;

let links = [
    {name: "Services", href: "#services"},
    {name: "Blog", href: "#blog"},
    {name: "About", href: "#about"},
    {name: "Contact", href: "#contact"}
];

let menuOpen = false;
const handleMenuClick = () => {
    menuOpen = !menuOpen;
}

let mounted = false;
onMount(() => {
    mounted = true;
});

</script>

{#if mounted}
    <div in:fly={{y: -10, duration:500, delay: 100}} out:fly={{y: -10, duration: 500}} class="flex flex-row justify-between fixed top-0 right-0 left-0 p-8 px-4 md:px-16 w-full text-stone-900 bg-amber-50">
        <div>
            <LogoWithLine />
        </div>
        <ul class="hidden md:flex text-black gap-8 items-center">
            {#each links as link, i}
                <li in:fly|global={{y: -10, duration: 500, delay: 500 + 100 * i}}><a class="hover:text-red-500" href={link.href}>{link.name}</a></li>
            {/each}
                <li in:fly|global={{y: -10, duration: 500, delay: 500 + 100 * links.length}}><a class="bg-green-950 px-4 p-2 text-white font-semibold hover:bg-red-500" href="#contact">Contact</a></li>
        </ul>
        <div class="md:hidden flex items-center">
            <button class="text-black" id="menu" on:click|preventDefault={handleMenuClick}>
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
                    <a class="bg-rose-400 px-4 p-2 text-black font-semibold" href="#contact">Contact</a>
                </div>
            </div>
        {/if}
    </div>
{/if}
<svelte:window bind:scrollY />