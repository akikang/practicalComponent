console.log(112233);
// ********************01********************
function showAll() {
  $("#overflow_ellipsis_box").toggleClass("overflow_ellipsis");
}
// ********************02********************
$("#get_duration_file").change(function () {
  $("#info_of_duration_file").html("");
  var selected_files = $("#get_duration_file").prop("files");
  for (var i = 0; i < selected_files.length; i++) {
    getDuration(selected_files[i]);
  }
});
function getDuration(file) {
  // get the duration of file
  var video = document.createElement("video");
  var fileURL = URL.createObjectURL(file);
  video.src = fileURL;
  // when get the duration arrange the send data and add index
  video.ondurationchange = function () {
    let file_name = file.name;
    let file_type = file.type;
    let file_size = Math.round((file.size / 1048576) * 100) / 100;
    let file_duration = this.duration;
    $("#info_of_duration_file").append(
      "<p>file name: " +
        file_name +
        "</p><p>file type:" +
        file_type +
        " </p><p>file size: " +
        file_size +
        "mb</p><p>file duration: " +
        file_duration +
        "s</p>"
    );
  };
}
// ********************03********************
var delete_page = "";

window.onload = function () {
  localStorage.setItem("companies", "");
  localStorage.setItem("users", "");
};
// change the checked status
function batch_checkbox(page) {
  var value = $("#" + page + "_batch_delete").is(":checked");
  if (value === true) {
    $("." + page + "_checkbox").prop("checked", true);
    // get all the id in current page
    var id_arr = $("." + page + "_checkbox")
      .map(function () {
        return this.value;
      })
      .get();
    // put into localStorage
    localStorage.setItem(page, id_arr);
  } else {
    $("." + page + "_checkbox").prop("checked", false);
    // delete all the id in localStorage
    localStorage.setItem(page, "");
  }
}
// when click 「削除」set the delete_page
function set_delete_page(page_name) {
  this.delete_page = page_name;
}
//save or delete id in localstorage
function saveId(page, checked, id) {
  var id_in_local = localStorage.getItem(page);
  if (checked) {
    if (!id_in_local) {
      id_in_local = id;
    } else {
      id_in_local += "," + id;
    }
  } else {
    $("#" + page + "_batch_delete").prop("checked", false);
    if (id_in_local.length == 1) {
      id_in_local = "";
    } else {
      id_in_local = id_in_local.split(",");
      var index = id_in_local.indexOf(id.toString());

      if (index > -1) {
        id_in_local.splice(index, 1);
      }
    }
  }
  localStorage.setItem(page, id_in_local);
}
//batch delete
function batch_delete() {
  var delete_ids = localStorage.getItem(this.delete_page);
  var delete_arr = delete_ids.split(",");
  $.ajax({
    url: "/" + this.delete_page + "/bulk_delete",
    type: "POST",
    data: {
      ids: delete_arr,
    },
    success: function (data) {
      debugger;
    },
  }).fail((data) => {
    alert("system error");
  });
}

// ********************04********************
function judgeClient() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
  if (isAndroid) {
    alert("Android");
  } else if (isIOS) {
    alert("iOS");
  } else {
    alert("else");
  }
}
// ********************06********************
function stringToUrl() {
  let contents = $("#oldUrlString").val();
  var reg = /https?:\/\/\S+(\s|\r\n|$)/gi;
  var url = contents.match(reg);

  if (url) {
    for (var i = 0; i < url.length; i++) {
      let str = url[i];
      str = str.replace(/\ +/g, "");
      str = str.replace(/[\r\n]/g, "");
      contents = contents.replace(
        str,
        "<a href='" + str + "' target='_blank'>" + str + "</a>"
      );
    }
  }
  $("#newUrlString")[0].innerHTML = contents;
}
