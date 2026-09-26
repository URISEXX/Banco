document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);

function procesarSimulacion() {
    const nombreInput = document.getElementById('nombre').value;
    const montoInput = parseFloat(document.getElementById('monto').value);
    const tasaAnualInput = parseFloat(document.getElementById('tasa').value) / 100;
    const plazoMeses = parseInt(document.getElementById('plazo').value);
    
    // Cálculo obligatorio del IVA sobre los intereses generados
    const IVA_VALOR = 0.16; 

    if (nombreInput.trim() === "" || isNaN(montoInput) || isNaN(tasaAnualInput) || montoInput <= 0) {
        alert("Por favor, ingrese el nombre del solicitante y parámetros numéricos válidos.");
        return;
    }

    const tituloResultado = document.getElementById('resultado-titulo');
    tituloResultado.textContent = `Simulación de crédito para: ${nombreInput}`;
    tituloResultado.style.display = 'block';

    // Esquema de amortización constante (pago a capital fijo)[cite: 1]
    const amortizacionCapital = montoInput / plazoMeses;
    const tasaMensualEquivalente = tasaAnualInput / 12;

    let saldoInsoluto = montoInput;
    const tablaBody = document.querySelector('#tabla-amortizacion tbody');
    tablaBody.innerHTML = '';

    for (let periodo = 1; periodo <= plazoMeses; periodo++) {
        // El saldo con el que inicia el mes
        let saldoInicial = saldoInsoluto;

        // Se aplican dinámicamente tasas de interés ordinarias sobre saldos insolutos[cite: 1]
        const interesDelPeriodo = saldoInicial * tasaMensualEquivalente;
        const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
        const pagoMensualTotal = amortizacionCapital + interesDelPeriodo + ivaSobreInteres;
        
        // El saldo al finalizar el mes tras restar el capital
        let saldoFinal = saldoInicial - amortizacionCapital;
        
        // Corrección de redondeo de decimales
        if (saldoFinal < 0.01) saldoFinal = 0;

        // Inyección exacta de las 7 columnas en el orden solicitado
        const fila = `<tr>
            <td>${periodo}</td>
            <td>$${saldoInicial.toFixed(2)}</td>
            <td>$${amortizacionCapital.toFixed(2)}</td>
            <td>$${interesDelPeriodo.toFixed(2)}</td>
            <td>$${ivaSobreInteres.toFixed(2)}</td>
            <td>$${pagoMensualTotal.toFixed(2)}</td>
            <td>$${saldoFinal.toFixed(2)}</td>
        </tr>`;
        
        tablaBody.innerHTML += fila;
        
        // El saldo final de este mes será el saldo inicial del siguiente
        saldoInsoluto = saldoFinal;
    }
}