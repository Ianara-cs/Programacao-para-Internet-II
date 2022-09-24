<script lang="ts">
    export let label: string
    export let value: string
</script>

<div class='input-control'>
    <label for={label}> {label}: </label>
    <input {...$$restProps} name={label} id={label} bind:value/>
</div>