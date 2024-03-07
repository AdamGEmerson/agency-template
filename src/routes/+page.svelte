<script>
    import {onMount} from "svelte";
    import {blur} from "svelte/transition";
    import {quartOut} from "svelte/easing";

    let mounted = false;
    onMount(() => {
        mounted = true;
    })
</script>

{#if mounted}
    <div class="flex w-full h-full z-10 items-center">
        <div class="flex flex-col gap-8 py-32 md:px-8 text-green-950" transition:blur={{delay: 800, duration: 1000, easing: quartOut}}>
            <h1 class="font-serif font-medium text-6xl text-center md:text-left md:text-7xl w-full md:w-3/4">
                Break the mold.
            </h1>
            <h2 class="text-xl md:text-2xl xl:text-3xl text-center md:text-left">
                With websites that create conversations.
            </h2>
            <a class="self-center md:self-start bg-green-950 text-center font-semibold px-4 md:px-8 p-2 md:p-4 w-36 md:w-48 text-xl hover:bg-red-500 text-white"
                href="#contact"
            >
                Let's Chat
            </a>
        </div>
    </div>
    <div class="absolute bottom-10 left-0 right-0 flex items-center justify-center w-full p-0"
         transition:blur={{delay: 1200, duration: 1000, easing: quartOut}}>
        <a href="mailto:hello@oddbreak.digital" class="hover:underline">hello@oddbreak.digital</a>
    </div>
{/if}