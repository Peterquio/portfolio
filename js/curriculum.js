function renderCurriculum(){

    const wrapper=document.getElementById("curriculum-wrapper");

    wrapper.innerHTML=curriculumData.map(section=>`

        <article class="curriculum-card">

            <div class="curriculum-header">

                <h3>${section.title}</h3>

                <span class="curriculum-arrow">▼</span>

            </div>

            <div class="curriculum-body">

                <div class="curriculum-content">

                    ${
                        section.body
                        ?
                        `<p>${section.body}</p>`
                        :
                        `
                        <ul>

                        ${section.list.map(item=>`

                            <li>${item}</li>

                        `).join("")}

                        </ul>
                        `
                    }

                </div>

            </div>

        </article>

    `).join("");

    document.querySelectorAll(".curriculum-header").forEach(header=>{

        header.onclick=()=>{

            header.parentElement.classList.toggle("open");

        };

    });

}

renderCurriculum();