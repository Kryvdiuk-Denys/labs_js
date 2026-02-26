function showName(name) {
      const elem = document.getElementsByTagName("span")[0];
      elem.textContent = name;
    }

    
    const elem = document.getElementsByTagName("span")[0];
    elem.onmouseover = function () {
      showName("Денис"); }