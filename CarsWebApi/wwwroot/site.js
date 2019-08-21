const uri = "api/Cars";
let todos = null;
function getCount(data) {
    const el = $("#counter");
    let name = "voiture";
    if (data) {
        if (data > 1) {
            name = " -Voitures";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#todos");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")

                    .append($("<td></td>").text(item.annee))
                    .append($("<td></td>").text(item.marque))
                    .append($("<td></td>").text(item.modele))
                    .append($("<td></td>").text(item.consomationVille))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            todos = data;
        }
    });
}

function addItem() {
    const item = {
        annee: $("#add-annee").val(),
        marque: $("#add-marque").val(),
        modele: $("#add-modele").val(),
        consomationVille: $("#add-consomation").val(),

    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-annee").val("");
            $("#add-marque").val("");
            $("#add-modele").val("");
            $("#add-consomation").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(todos, function (key, item) {
        if (item.id === id) {
            $("#edit-annee").val(item.annee);
            $("#edit-marque").val(item.marque);
            $("#edit-modele").val(item.modele);
            $("#edit-consomation").val(item.consomationVille);
            $("#edit-id").val(item.id);

        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        annee: $("#edit-annee").val(),
        marque: $("#edit-marque").val(),
        modele: $("#edit-modele").val(),
        consomationVille: $("#edit-consomation").val(),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}