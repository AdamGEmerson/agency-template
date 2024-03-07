<script>
    import {onMount} from "svelte";
    import Logo from "$lib/Logo.svelte"

    let y = 0;
    let innerHeight = 0;
    let totalHeight = 0;

    onMount(() => {
        totalHeight = document.body.scrollHeight;
    })

    let percentScroll = 0;
    $: percentScroll = (y / (totalHeight - innerHeight)) * 100;
</script>

<div class="flex w-full h-[100vh] z-10 justify-around items-center">
    <div class="w-full flex justify-around fixed">
        <div>
            <Logo class="text-green-950 w-80 translate-x-8" />
            <div class="flex self-start w-96 absolute top-8">
                <div class="h-1.5 bg-rose-400"
                     style="width: {percentScroll}%" />
            </div>
        </div>
    </div>
    <div class="fixed left-10 top-10">
        {percentScroll}%
    </div>
    <div class="absolute left-10">
        <h1 class="text-3xl">
            Hello World
        </h1>
    </div>
</div>

<svelte:window bind:scrollY={y} bind:innerHeight />