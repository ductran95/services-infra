FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TestApi/TestApi.csproj", "TestApi/"]
RUN dotnet restore "TestApi/TestApi.csproj"
COPY . .
WORKDIR "/src/TestApi"
RUN dotnet build "TestApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TestApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
RUN apt-get update
RUN apt-get install -y curl 
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TestApi.dll"]
HEALTHCHECK --interval=30s --timeout=3s --start-period=1s --start-interval=2s --retries=5 CMD curl -f http://localhost:8080/ping || exit 1