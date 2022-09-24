<script lang="ts">
  import Button from "./components/Button.svelte";
  import Form from "./components/Form.svelte";
  import InputControl from "./components/inputControl.svelte";

  let name: string, input_weight: string, input_height: string

  function calcular() {
    const weight = Number(input_weight)
    const height = Number(input_height)

    const bmi = weight / (height*height)

    alert('BMI = ' + bmi.toFixed(1))
  }

</script>

<div class='container'>
  <header>
    <h1>BMI Calculator</h1>
  </header>
  <main>
    <h2>Type your data</h2>
    <Form>
      <InputControl autocomplete="off" label='Name' bind:value={name}  type='text'/>
      <InputControl autocomplete="off" label='Weight' bind:value={input_weight} type='number'/>
      <InputControl autocomplete="off" label='Height' bind:value={input_height} type='number' step="0.01"/>
      <Button onClick={calcular}/>
    </Form>
    <section id="result">BMI: <span id="bmi">34.5</span></section>
  </main>
  <footer>
    <p>R1 Software @ 2023</p>
  </footer>
</div>
