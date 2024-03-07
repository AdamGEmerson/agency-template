<script>
	import '../app.pcss';
</script>

<div class="bg-amber-50 px-16 py-8 min-h-[200vh] h-full relative">
<!--    <NavBar />-->
    <slot />
    <div class="absolute left-10 bottom-10">
        <h1 class="text-3xl">
            End of Page
        </h1>
    </div>
</div>

