/* eslint-disable no-console */


const main = document.querySelector("main");

function addModal(){
    main.innerHTML +=`

    <!-- Modal -->
<div class="modal fade" id="modalLoading" role="dialog" aria-labelledby="exampleModalCenterTitle" >
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div`
}

function showLoad(){
    const modala = document.getElementById("modalLoading")
    console.log(modala);
}

export {addModal,showLoad};