<script lang="ts">
    import Logo from "$lib/Logo.svelte";
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

<a class="w-40 flex justify-around fixed" href="/">
    <div>
        <Logo class="text-white w-full h-full translate-x-[9%]" />
        <div class="flex self-start w-[116%] absolute top-[54%]">
            <div class="h-1 bg-primary rounded"
                 style="width: {percentScroll}%" />
        </div>
    </div>
</a>

<svelte:window bind:scrollY={y} bind:innerHeight />