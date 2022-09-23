<script lang="ts">
  import Button from "./Button.svelte";
  import InputControl from "./inputControl.svelte";
    let name: string, input_weight: string, input_height: string

    function Calcular() {
        const weight = Number(input_weight)
        const height = Number(input_height)

        const bmi = weight / (height*height)

        alert('BMI = ' + bmi.toFixed(1))
    }
</script>

<form >
    <InputControl autocomplete="off" label='Name' bind:value={name} type='text'/>
    <InputControl autocomplete="off" label='Weight' bind:value={input_weight} type='number'/>
    <InputControl autocomplete="off" label='Height' bind:value={input_height} type='number' step="0.01"/>
    <Button onClick={Calcular}/>
</form>

