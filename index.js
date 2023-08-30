const API_URL = 'http://localhost:3000/thoughts';

$(document).ready(() => {
    loadThoughts();

    $('#thoughtForm').submit(function (e) {
        e.preventDefault();
        let thoughtId = $('#thoughtId').val();
        if (thoughtId) {
            updateThought(thoughtId);
        } else {
            addThought();
        }
    });
});

function loadThoughts() { 
    $.get(API_URL, function (data) { 
        let thoughtBox = '';
        data.forEach(thought => { 
            thoughtBox += ` 
            <span class="border-bottom border-danger rounded-3">
            <div class="container py-5 mb-4 bg-dark rounded-3 ">
                    <p class="text-light p-2 overflow-auto">${thought.thought}</p>
                    <div class="text-right bg-dark">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end p-3">
                            <button class="btn btn-secondary me-md-2" onclick="editThought(${thought.id})">Ruminate</button>
                            <button class="btn btn-danger" onclick="deleteThought(${thought.id})">Burn</button>
                        </div>
                    </div>
                   </div>
        </div>
        </span>
    
            
            `;
        });
        $('#thoughtCatalogue').html(thoughtBox);
    });
}

function addThought() { 
    const thought = { 
        id: $('#thoughtId').val(),
        thought: $('#thoughtInput').val()
    };
    $.post(API_URL, thought, function () { 
        resetForm();
        loadThoughts();
    });
}

function editThought(id) { 
    $.get(API_URL + "/" + id, function (thought) {
        $("#thoughtId").val(thought.id);
        $("#thoughtInput").val(thought.thought);
    });
}

function updateThought(id) { 
    const thought = { 
        id: $('#thoughtId').val(),
        thought: $('#thoughtInput').val()
    };
    $.ajax({
        url: API_URL + "/" + id ,
        type: 'PUT' , 
        data: thought ,
        success: function () { 
            resetForm();
            loadThoughts();
        }
    });
}

function deleteThought (id) { 
    $.ajax({ 
        url: API_URL + "/" + id ,
        type: 'DELETE' ,
        success: function () { 
            loadThoughts();
        }
    });
}

function resetForm() { 
    $('#thoughtId').val('');
    $('#thoughtInput').val('');
}
