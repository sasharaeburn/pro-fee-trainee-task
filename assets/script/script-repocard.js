// request -- запрос к серверу
// path - вторая (изменчивая) часть пути, по которому нужно обратиться
async function request(path) {
    let url = 'https://api.github.com' + path;

    let response = await fetch(url);

    // "если не вылезла ошибка"
    if (response.ok) {

        // "верни результат в виде объекта
        return await response.json();

    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}


function initialization() {
    let repoName = new URL(window.location)
        .searchParams
        .get('repo');


    request('/repos/' + repoName).then(data => createRepo(data));
}

initialization();

function createRepo(data) {
    //todo подумать, не удалить ли мне repoSelected нафик, а то очень много контейнеров
    const repoSelected = document.getElementById('repo-selected');

    let headers = document.createElement('div');
    headers.setAttribute('class', 'repo-header');

    //todo переименовать переменную nameOfRepo и разобраться, нужен ли headers
    const nameOfRepo = document.createElement('div');
    nameOfRepo.setAttribute('class', 'name-of-repo');
    nameOfRepo.innerText = "Repository's name";

    const starsHeader = document.createElement('div');
    starsHeader.setAttribute('class', 'stars-header');
    starsHeader.innerText = "Stars";

    const commitHeader = document.createElement('div');
    commitHeader.setAttribute('class', 'commit-header');
    commitHeader.innerText = "Latest commit";

    headers.appendChild(nameOfRepo);
    headers.appendChild(starsHeader);
    headers.appendChild(commitHeader);

    repoSelected.appendChild(headers);

    let mainInfo = document.createElement('div');
    mainInfo.setAttribute('class', 'main-info');

    // let userHeader = document.createElement('div');
    // userHeader.setAttribute('class', 'user-header');
    // userHeader.innerHTML = 'User info';

    let repoName = document.createElement('div');
    repoName.setAttribute('class', 'repo-name');
    repoName.innerHTML = data.name;

    let lastCommit = document.createElement('div');
    lastCommit.setAttribute('class', 'repo-last-commit');
    lastCommit.innerText = data.updated_at;

    let stars = document.createElement('div');
    stars.setAttribute('class', 'repo-stars');
    stars.innerText = '⭐' + data.stargazers_count;

    // mainInfo.appendChild(userHeader);
    mainInfo.appendChild(repoName);
    mainInfo.appendChild(lastCommit);
    mainInfo.appendChild(stars);

    repoSelected.appendChild(mainInfo);

    const repoOwner = document.createElement('div');
    repoOwner.setAttribute('class', 'repo-owner');

    const profilePic = document.createElement('img');
    profilePic.setAttribute('class', 'profile-pic');
    profilePic.setAttribute('width', '100px');
    profilePic.setAttribute('src', data.owner.avatar_url);

    const githubLink = document.createElement('a');
    githubLink.setAttribute('class', 'profile-link');
    githubLink.setAttribute('href', data.owner.html_url);
    githubLink.innerText = data.owner.login;

    repoOwner.appendChild(profilePic);
    repoOwner.appendChild(githubLink);

    repoSelected.appendChild(repoOwner);

    const repoLangs = document.createElement('div');
    repoLangs.setAttribute('class', 'repo-languages');
    // todo сделать так, чтобы считывал все языки! через .languages почему-то не работает
    repoLangs.innerText = data.language; //не уверена насчёт этого!!
    if (data.language == null) {
        repoLangs.innerText = 'The information about the used languages is not available.';
    }

    const description = document.createElement('div');
    description.setAttribute('class', 'repo-description');
    description.innerText = data.description;

    const contributors = document.createElement('div');
    contributors.setAttribute('class', 'repo-contributors');
    contributors.innerText = data.contributors_url[0].login;

    repoSelected.appendChild(repoLangs);
    repoSelected.appendChild(description);
    repoSelected.appendChild(contributors);
}