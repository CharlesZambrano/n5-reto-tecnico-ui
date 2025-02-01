📁 n5-reto-tecnico-api
│ ├── .gitignore
│ ├── docker-compose.yml
│ ├── n5-reto-tecnico-api.sln
│ ├── README.md
│ ├── 📁 .github
│ │ ├── 📁 workflows
│ ├── 📁 N5.Permissions.Api
│ │ ├── appsettings.json
│ │ ├── N5.Permissions.Api.csproj
│ │ ├── Program.cs
│ │ ├── 📁 Configurations
│ │ ├── 📁 DTOs
│ │ │ ├── PermissionDto.cs
│ │ │ ├── PermissionTypeDto.cs
│ │ ├── 📁 Controllers
│ │ │ ├── PermissionController.cs
│ │ │ ├── PermissionTypeController.cs
│ │ ├── 📁 Middlewares
│ │ │ ├── ExceptionHandlingMiddleware.cs
│ │ ├── 📁 Properties
│ │ │ ├── launchSettings.json
│ ├── 📁 N5.Permissions.Application
│ │ ├── N5.Permissions.Application.csproj
│ │ ├── 📁 Commands
│ │ │ ├── 📁 PermissionCommand
│ │ │ │ ├── CreatePermissionCommand.cs
│ │ │ │ ├── UpdatePermissionCommand.cs
│ │ │ ├── 📁 PermissionTypeCommand
│ │ │ │ ├── CreatePermissionTypeCommand.cs
│ │ ├── 📁 Handlers
│ │ │ ├── 📁 PermissionHandler
│ │ │ │ ├── CreatePermissionHandler.cs
│ │ │ │ ├── GetPermissionByIdHandler.cs
│ │ │ │ ├── GetPermissionsHandler.cs
│ │ │ │ ├── SearchPermissionsHandler.cs
│ │ │ │ ├── UpdatePermissionHandler.cs
│ │ │ │ ├── ReindexPermissionHandler.cs
│ │ │ ├── 📁 PermissionTypeHandler
│ │ │ │ ├── CreatePermissionTypeHandler.cs
│ │ │ │ ├── GetPermissionTypesHandler.cs
│ │ ├── 📁 Profiles
│ │ │ ├── PermissionProfile.cs
│ │ │ ├── PermissionTypeProfile.cs
│ │ ├── 📁 Queries
│ │ │ ├── 📁 PermissionQuerie
│ │ │ │ ├── GetPermissionByIdQuery.cs
│ │ │ │ ├── GetPermissionQuery.cs
│ │ │ │ ├── SearchPermissionsQuery.cs
│ │ │ ├── 📁 PermissionTypeQuerie
│ │ │ │ ├── GetPermissionTypesQuery.cs
│ │ ├── 📁 Services
│ ├── 📁 N5.Permissions.Domain
│ │ ├── N5.Permissions.Domain.csproj
│ │ ├── 📁 Entities
│ │ │ ├── Permission.cs
│ │ │ ├── PermissionType.cs
│ │ ├── 📁 Interfaces
│ │ │ ├── IUnitOfWork.cs
│ │ │ ├── 📁 Repositories
│ │ │ │ ├── IPermissionRepository.cs
│ │ │ │ ├── IPermissionTypeRepository.cs
│ │ ├── 📁 ValueObjects
│ ├── 📁 N5.Permissions.Infrastructure
│ │ ├── N5.Permissions.Infrastructure.csproj
│ │ ├── 📁 Elasticsearch
│ │ │ ├── 📁 Services
│ │ │ │ ├── ElasticsearchService.cs
│ │ ├── 📁 Migrations
│ │ │ ├── 20250130151401_InitialCreate.cs
│ │ │ ├── ApplicationDbContextModelSnapshot.cs
│ │ ├── 📁 Persistence
│ │ │ ├── ApplicationDbContext.cs
│ │ ├── 📁 Repositories
│ │ │ ├── PermissionRepository.cs
│ │ │ ├── PermissionTypeRepository.cs
│ │ │ ├── UnitOfWork.cs
│ │ ├── 📁 Logging
│ ├── 📁 N5.Permissions.Tests
│ │ ├── N5.Permissions.Tests.csproj
│ │ ├── UnitTest1.cs
│ │ ├── 📁 UnitTests
│ │ │ ├── 📁 ApplicationTest
│ │ │ ├── 📁 InfrastructureTest
│ │ ├── 📁 Controllers
