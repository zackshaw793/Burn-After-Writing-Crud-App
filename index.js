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
                    <div class="p-5 mb-1 border-danger lc-block bg-dark rounded-3">
                        <div class="lc-block bg-dark">
                            <!--<p class="text-dark">${thought.id}</p>-->
                            <p class="text-light p-2 overflow-auto">${thought.thought}</p>
                            <div class="text-right bg-dark">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end p-3">
                                <button class="btn btn-warning me-md-2" onclick="editThought(${thought.id})">Ruminate</button>
                                <button class="btn btn-danger" onclick="deleteThought(${thought.id})">Burn</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
    
            
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
    $('#thought').val('');
}
