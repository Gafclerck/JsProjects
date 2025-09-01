let container = document.querySelector(".container");
let ajouteur = document.querySelector(".ajout");
let ajoutSection = document.querySelector(".ajoutSection");
let inputIsOn = false;

// -----------------------------
// Gestion du stockage
// -----------------------------
function sauvegarderTaches() {
  let taches = [];
  document.querySelectorAll(".activity").forEach((task) => {
    let texte = task.querySelector("h3").textContent;
    let estFaite = !!task.querySelector("del"); // true si barrée
    taches.push({ texte, estFaite });
  });
  localStorage.setItem("todolist", JSON.stringify(taches));
  console.table(taches)
}

function chargerTaches() {
  let taches = JSON.parse(localStorage.getItem("todolist")) || [];
  taches.forEach((t) => ajouterTache(t.texte, t.estFaite));
}

// -----------------------------
// Gestion des tâches
// -----------------------------
function afficher_input() {
  let input = document.createElement("input");
  input.type = "text";
  input.id = "newEvent";
  input.placeholder = "Nouvelle tâche";
  ajoutSection.appendChild(input);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ajouterTache(input.value);
    }
  });

  input.focus();
}

function ajouterTache(texte, estFaite = false) {
  if (!texte.trim()) return; // empêche les tâches vides

  let newTask = document.createElement("div");
  newTask.classList.add("activity");

  let contenu = estFaite ? `<del>${texte}</del>` : texte;

  newTask.innerHTML = `
    <h3 style="margin: 0;">${contenu}</h3>
    <div class="manage">
        <div class="done">✔</div>
      <div class="supprimer">❌</div>
    </div>`;

  // Ajout des events sur les boutons
  initialiserListeners(newTask);

  container.appendChild(newTask);

  // Nettoyer l’input
  let input = document.querySelector("#newEvent");
  if (input) input.remove();
  inputIsOn = false;

  sauvegarderTaches();
}

function initialiserListeners(activity) {
  let supprimer = activity.querySelector(".supprimer");
  let done = activity.querySelector(".done");

  supprimer.addEventListener("click", () => {
    activity.remove();
    sauvegarderTaches();
  });

  done.addEventListener("click", () => {
    let h3 = activity.querySelector("h3");
    if (!h3.querySelector("del")) {
      h3.innerHTML = `<del>${h3.textContent}</del>`;
    } else {
      h3.innerHTML = h3.textContent; // permet de "décocher"
    }
    sauvegarderTaches();
  });
}

// -----------------------------
// Gestion du bouton +
// -----------------------------
ajouteur.addEventListener("click", () => {
  if (!inputIsOn) {
    afficher_input();
  } else {
    let input = document.querySelector("#newEvent");
    if (input) input.remove();
  }
  inputIsOn = !inputIsOn;
});

// -----------------------------
// Initialisation
// -----------------------------
chargerTaches();
