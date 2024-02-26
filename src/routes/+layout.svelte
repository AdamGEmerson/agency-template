<script>
	import '../app.pcss';
    import NavBar from "$lib/NavBar.svelte";
    import nebulaImg from "$lib/images/nebula-mask.png";
</script>

<div class="bg-black px-16 py-8 min-h-[100vh]">
    <img
        src={nebulaImg}
        alt="A space nebula, representing astronomical growth."
        class="w-auto h-full d:min-h-0 object-cover z-0 absolute top-0 left-0 right=0 bottom=0 opacity-40 pointer-events-none"
    />
    <NavBar />
    <slot />
</div>

