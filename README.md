Области хранения данных:

-   база данных на json-server
-   эмулятор BFF
-   redux store

Сущности приложения:

-   пользователи: БД(здесь будет храниться весь список пользователей), BFF(сессия текущего пользователя), стор(отображение в браузере)
-   роль пользователя: БД(список всех ролей), BFF(сессия текущего с его ролью), стор(использование в браузере)
-   статья: БД(список всех статей), стор(отображение в браузере)
-   комментарий: БД(список всех комментариев), стор(отображение в браузере)

Таблицы БД:

-   пользователи - users:
    -   id
    -   login
    -   password
    -   registed_at
    -   role_id
-   роли - roles:
    -   id
    -   name
-   статьи - posts:
    -   id
    -   title
    -   image_url
    -   content
    -   published_at
-   комментарии - comments:
    -   id
    -   author_id
    -   post_id
    -   content

Схема состояния на BFF:

-   сессия текущего пользователя:
    -   login
    -   password
    -   role

Схема для redux store:

-   user:
    -   id
    -   login
    -   roleID
    -   session
-   posts - массив post:
    -   id
    -   title
    -   imageUrl
    -   publishedAt
    -   commentsCount
-   post:
    -   id
    -   title
    -   imageUrl
    -   publishedAt
    -   content
    -   comments - массив comment:
        -   id
        -   author
        -   content
        -   publishedAt
-   users - массив user:
    -   id
    -   login
    -   registedAt
    -   role
