# Prueba técnica GCP Fullstack

## 1. Descripción
Mini aplicación web simplificada construida para registrar y consultar eventos operativos generados desde canales digitales.

## 2. Tecnologías usadas
* **Back-end**: Java 17 con Spring Boot 3.4.5 (Spring Web).
* **Front-end**: HTML y JavaScript.
* **Persistencia**: Cloud SQL y PostgreSQL en Local.

## 3. Cómo ejecutar localmente

### Prerrequisitos
* Docker
* Java JDK 17 o superior instalado.
* Maven instalado (u usar ./mvnw integrado).

### Pasos
1.  **Ejecutar el Backend**:
    El backend se puede levantar de distintas formas, descargando el repositorio y ejecutandolo con maven, sin embargo, se requiere tener las dependencias necesarias (jdk, maven, postgres).
    La manera recomenda es a través de Docker-compose.yml, está preparado para realizar la compilacion, generacion de BD y ejecución del backend.

    Para ejecutar de la manera tradicional: Entra a la carpeta del backend y ejecuta el comando de Spring Boot:
    ```cd springboot-events
    mvn spring-boot:run
    ```
    RECOMENDANDO
    Para ejecutar usando Docker: Entra a la carpeta del backend y ejecuta el comando de docker compose:
    ```cd springboot-events
    docker compose up --build
    ```

    La API estará disponible de inmediato en: `http://localhost:8080`


2.  **Ejecutar el Frontend**:
    Simplemente abre el archivo `events-frontend-app/public/index.html` en cualquier navegador web.

## 4. Endpoints disponibles
* `POST /events`: Registra un nuevo evento.
* `GET /events`: Devuelve la lista completa de eventos.
* `GET /events?accountId={id}`: Filtra eventos por cuenta específica.
* `GET /accounts/{accountId}/summary`: Retorna el consolidado financiero de una cuenta.
* `GET /health`: Estado de salud de la aplicación.

## 5. Front-end
Diseño adaptado al mockup utilizando estilos limpios de CSS y HTML/JS.

## 6. Persistencia elegida
Se utlizó CloudSQL para el ambiente productivo, y Postgres15 para el ambiente local.

## 7. Diseño de despliegue en GCP
1.  **Servicio para Backend**: **Cloud Run**. Al ser una API REST contenedorizada.
2.  **Servicio para Frontend**: **Firebase Hosting** Ideal para hospedar el HTML/JS estático a baja latencia.
3.  **Servicio para Persistencia**: **Cloud SQL (PostgreSQL)**
4.  **Variables de Entorno**: Administradas nativamente mediante **Secret Manager** (para conexion de DB) inyectadas directamente al contenedor Cloud Run, o variables de entorno estándar en la consola de GCP.
5.  **Monitoreo de Logs**: Utilización nativa del ecosistema **Cloud Logging** de Google Cloud.

## 8. Diagrama de arquitectura
```
[ Cliente (Navegador Web) ]
          │
          ├───► (Carga Front estático) ───► [ Firebase Hosting ]
          │
          └───► (Peticiones API REST)  ───► [ Cloud Run (Backend) ]
                                                     │
                                                     ▼
                                              [ Cloud SQL  ]
```

## 10. Limitaciones
- Si crece la complejidad del Frontend es recomndable migrarlo a alguna herramienta/Framework

## 11. Mejoras futuras
- Seguridad con Spring Security
- JWT
- Paginación
- Alta disponibilidad en Persistencia: Configurar Réplicas de Lectura en Cloud SQL distribuidas en múltiples zonas de disponibilidad,

## 12. Uso de IA
Se utilizó Geminiy DeepSeek como apoyo para generar parte del la documentación.
Validación de despliegue en GCP: Se consultó documentación técnica asistida por IA para garantizar la precisión de los comandos de despliegue de gcloud.
Generacion de archivos Docker.
