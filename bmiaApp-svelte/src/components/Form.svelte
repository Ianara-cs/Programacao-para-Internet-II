<script lang="ts">
      let name: string, input_weight: string, input_height: string

    function Calcular() {
        const weight = Number(input_weight)
        const height = Number(input_height)

        const bmi = weight / (height*height)

        alert('BMI = ' + bmi.toFixed(1))
    }
</script>

<form >
    <slot/>
</form>

