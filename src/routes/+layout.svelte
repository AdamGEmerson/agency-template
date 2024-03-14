<script>
	import '../app.pcss';
    import NavBar from '$lib/NavBar.svelte';
</script>

<svelte:head>
    <title>Odd Break</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="title" content="Odd Break" />
    <meta name="description" content="At Odd Break Digital, we craft websites that stand out, spark conversation, and drive results. We're a passionate bunch of digital strategists and designers who believe in the power of creativity and collaboration to break through the ordinary and build websites that are anything but boring." />
</svelte:head>

<div class="px-16 py-8 min-h-[100vh] h-full relative overflow-x-hidden">
    <NavBar />
    <slot />
</div>

