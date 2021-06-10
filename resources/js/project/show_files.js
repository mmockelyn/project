let kt_modal_users_search_handler = document.querySelector('#kt_modal_users_search_handler')
let wrapper = kt_modal_users_search_handler.querySelector('[data-kt-search-element="wrapper"]')
let suggestion = kt_modal_users_search_handler.querySelector('[data-kt-search-element="suggestions"]')
let results = kt_modal_users_search_handler.querySelector('[data-kt-search-element="results"]')
let empty = kt_modal_users_search_handler.querySelector('[data-kt-search-element="empty"]')
let content_file = document.querySelector('#content_files')
let search;

function searchUserList() {
    let searching = function(e) {
        console.log(e)
        kt_modal_users_search_handler.addEventListener('keyup', (e) => {
            e.preventDefault()
            $.ajax({
                url: '/api/user/searching',
                method: 'POST',
                data: {
                    "search": kt_modal_users_search_handler.querySelector('[data-kt-search-element="input"]').value,
                    "project_id": project_overview_chart.dataset.projectId,
                    "user_id": document.querySelector('#kt_body').dataset.userId
                },
                success: (data) => {
                    suggestion.classList.add('d-none')
                    $('[data-kt-search-element="results"]').removeClass('d-none')
                    $('[data-kt-search-element="results"]').html(data.content)
                    console.log(data)
                },
                error: (err) => {
                    console.error(err)
                }
            })
        })
    };

    let clearSearch = function(e) {
        suggestion.classList.remove('d-none');
        results.classList.add('d-none');
        empty.classList.add('d-none')
    };

    (search = new KTSearch(kt_modal_users_search_handler))
        .on("kt.search.process", searching);
    search.on("kt.search.clear", clearSearch)
}
function initContentFile() {
    $.ajax({
        url: `/api/project/${document.querySelector('#project').dataset.projectId}/files`,
        success: (data) => {
            content_file.innerHTML = "";
            data.files.forEach(file => {
                content_file.innerHTML += `
                    <div class="col-12 col-sm-12 col-xl">
                        <!--begin::Card-->
                        <div class="card h-100">
                            <!--begin::Card body-->
                            <div class="card-body d-flex justify-content-center text-center flex-column p-8">
                                <!--begin::Name-->
                                <a href="/project/${document.querySelector('#project').dataset.projectId}/files/${file.id}/dispatcher" class="text-gray-800 text-hover-primary d-flex flex-column">
                                    <!--begin::Image-->
                                    <div class="symbol symbol-60px mb-6">
                                        <img src="/storage/core/icons_files/${file.type}.png" alt="" data-toggle="tooltip" title="${file.type}"/>
                                    </div>
                                    <!--end::Image-->
                                    <!--begin::Title-->
                                    <div class="fs-5 fw-bolder mb-2">${file.name}</div>
                                    <!--end::Title-->
                                </a>
                                <!--end::Name-->
                                <!--begin::Description-->
                                <div class="fs-7 fw-bold text-gray-400 mt-auto">${file.created_at}</div>
                                <!--end::Description-->
                            </div>
                            <!--end::Card body-->
                        </div>
                        <!--end::Card-->
                    </div>
                `
            })
        },
        error: (err) => {
            console.log(err)
        }
    })
}

searchUserList()
initContentFile()

jQuery(document).ready(function () {

});