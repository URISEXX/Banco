document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);

function procesarSimulacion() {
    const montoInput = parseFloat(document.getElementById('monto').value);
    const tasaAnualInput = parseFloat(document.getElementById('tasa').value) / 100;
    const plazoMeses = parseInt(document.getElementById('plazo').value);
    const IVA_VALOR = 0.16;

    if (isNaN(montoInput) || isNaN(tasaAnualInput) || montoInput <= 0) {
        alert("Ingrese parámetros numéricos válidos e intente nuevamente.");
        return;
    }

    const amortizacionCapital = montoInput / plazoMeses;
    const tasaMensualEquivalente = tasaAnualInput / 12;

    let saldoInsoluto = montoInput;
    const tablaBody = document.querySelector('#tabla-amortizacion tbody');
    tablaBody.innerHTML = '';
    let acumuladoPagos = 0;

    for (let periodo = 1; periodo <= plazoMeses; periodo++) {
        const interesDelPeriodo = saldoInsoluto * tasaMensualEquivalente;
        const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
        const pagoMensualTotal = amortizacionCapital + interesDelPeriodo + ivaSobreInteres;
        
        acumuladoPagos += pagoMensualTotal;

        // Líneas añadidas para que los resultados se muestren en la tabla de tu HTML
        const fila = `<tr>
            <td>${periodo}</td>
            <td>$${interesDelPeriodo.toFixed(2)}</td>
            <td>$${ivaSobreInteres.toFixed(2)}</td>
            <td>$${pagoMensualTotal.toFixed(2)}</td>
        </tr>`;
        tablaBody.innerHTML += fila;
        
        // Se resta el capital pagado al saldo para el siguiente mes
        saldoInsoluto -= amortizacionCapital;
    }
}