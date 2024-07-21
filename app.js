document.getElementById('searchBtn').addEventListener('click', function() {
    const pincode = document.getElementById('pincode').value;
    const apiKey = '579b464db66ec23bdd0000011e2323d121fe4dc742120d98165f7a11';
    const url = `https://api.data.gov.in/resource/04cbe4b1-2f2b-4c39-a1d5-1c2e28bc0e32?api-key=${apiKey}&format=json&filters[pincode]=${pincode}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const infoTitle = document.getElementById('infoTitle');
            const infoGrid = document.getElementById('infoGrid');

            if (data.records && data.records.length > 0) {
                const info = data.records[0];

                document.getElementById('officeName').textContent = info['officename'] || 'N/A';
                document.getElementById('district').textContent = info['districtname'] || 'N/A';
                document.getElementById('stateName').textContent = info['statename'] || 'N/A';
                document.getElementById('circleName').textContent = info['circlename'] || 'N/A';
                document.getElementById('divisionName').textContent = info['divisionname'] || 'N/A';
                document.getElementById('regionName').textContent = info['regionname'] || 'N/A';
                document.getElementById('officeType').textContent = info['officetype'] || 'N/A';

                const deliveryStatusElement = document.getElementById('deliveryStatus');
                const deliveryStatus = info['deliverystatus'] || 'N/A';
                if (deliveryStatus === 'Delivery') {
                    deliveryStatusElement.innerHTML = '<span class="delivery-status delivery"></span>';
                } else if (deliveryStatus === 'Non-Delivery') {
                    deliveryStatusElement.innerHTML = '<span class="delivery-status no-delivery"></span>';
                } else {
                    deliveryStatusElement.innerHTML = '<span class="delivery-status"></span>';
                }

                infoTitle.textContent = 'Here is all the information about your pincode';
                infoTitle.classList.remove('error');
            } else {
                clearInfoGrid();
                infoTitle.textContent = 'No information found for this pincode. Please check and enter a valid pincode.';
                infoTitle.classList.add('error');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            clearInfoGrid();
            infoTitle.textContent = 'Error fetching data. Please try again later.';
            infoTitle.classList.add('error');
        });
});

function clearInfoGrid() {
    document.getElementById('officeName').textContent = '';
    document.getElementById('district').textContent = '';
    document.getElementById('stateName').textContent = '';
    document.getElementById('circleName').textContent = '';
    document.getElementById('divisionName').textContent = '';
    document.getElementById('regionName').textContent = '';
    document.getElementById('officeType').textContent = '';
    document.getElementById('deliveryStatus').innerHTML = '';
}
