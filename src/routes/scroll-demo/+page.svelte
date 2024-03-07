<script>
    import {onMount} from "svelte";

    let y = 0;
    let innerHeight = 0;
    let totalHeight = 0;

    onMount(() => {
        totalHeight = document.body.scrollHeight;
    })

    let percentScroll = 0;
    $: percentScroll = (y / (totalHeight - innerHeight)) * 100;
</script>


<svelte:window bind:scrollY={y} bind:innerHeight />

<div class="h-[150vh]">
    <div class="fixed top-60 left-20">
        Scroll: {percentScroll}%
    </div>
    <div class="absolute bottom-10 flex justify-center left-0 right-0 z-50 bg-white">
        Hello World - End of Page
    </div>
</div>