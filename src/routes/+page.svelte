<script>
    import {onMount} from "svelte";
    import {fly} from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let mounted = false;
    onMount(() => {
        mounted = true;
    })
</script>

{#if mounted}
    <div class="flex w-full h-[100vh] z-10">
        <div class="flex flex-col gap-8 py-32 md:px-32">
            <h1 class="text-7xl md:text-8xl xl:text-9xl text-white font-bold w-1/2"
                transition:fly={{delay: 400, duration: 500, y: -10, easing: cubicOut}}
            >
                untitled digital
            </h1>
            <h2 class="font-serif text-primary text-2xl md:text-4xl"
                transition:fly={{delay: 600, duration: 500, y: -10, easing: cubicOut}}
            >
                Where creativity meets conversion
            </h2>
            <a class="bg-primary text-black text-center font-semibold px-8 p-4 w-48 text-xl hover:bg-white hover:text-primary"
                    transition:fly={{delay: 800, duration: 500, y: -10, easing: cubicOut}}
                href="#contact"
            >
                Let's Chat
            </a>
        </div>
    </div>
{/if}