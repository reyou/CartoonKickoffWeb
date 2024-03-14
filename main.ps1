
# https://docs.unity3d.com/2021.1/Documentation/Manual/CommandLineArguments.html

$edge_location = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$BuildOutputFolderPath = "C:\Users\$env:USERNAME\Ggg.Github\CartoonKickoff\CartoonKickoff\Build\WebGL"
$WebFolder = "C:\Users\dj_re\Ggg.Github\CartoonKickoffWeb"
$WebBuildFolder = "C:\Users\dj_re\Ggg.Github\CartoonKickoffWeb\public"

function Server {
    $current_location = Get-Location   
    WebBuild
    Write-Host "Setting location to $WebBuildFolder LogGuid: cdb7ae78-7242-41a5-a541-bc31c45a6aee"
    Set-Location $WebFolder
    npm run start
    Write-Host "Setting location to $current_location LogGuid: 1b2a577e-79ae-4946-9c6e-e54cb3e4de78"
    Set-Location $current_location
}

function AndroidBuild {
    Write-Host "Android Build"
    Write-Host "TODO"
}

function Build {
    Write-Host "Executing 'build' action"
    $UnityPath = "C:\Program Files\Unity\Hub\Editor\2023.2.9f1\Editor\Unity.exe"
    Write-Host "Using $UnityPath"
    $BuildMethod = "Assets.Scripts.Editor.WebGlBuildScript.BuildProjectFromCli"
    $LogFilePath = "C:\Users\$env:USERNAME\AppData\Local\Unity\Editor\Editor.log" 
    $VSCodePath = "code"  

    
    # Delete everything under $BuildOutputFilePath
    if (Test-Path $BuildOutputFolderPath) {
        Write-Host "Deleting all contents in the build output directory.."
        Remove-Item -Path "$BuildOutputFolderPath\*" -Recurse -Force
        Write-Host "Deleted all contents in the build output directory."
    }
    else {
        Write-Host "Build output directory does not exist: $BuildOutputFolderPath"
        Write-Host "Exiting build action."
        return 1
    }
    
    # Check if Unity executable exists
    if (Test-Path -Path $UnityPath) {
        Write-Host "Building started"
        Write-Host "Checking for existing Unity processes..."

        # Check for running Unity instances
        $unityProcesses = Get-Process Unity -ErrorAction SilentlyContinue
        if ($unityProcesses) {
            $userResponse = Read-Host "Running Unity processes detected. Would you like to close them? (y/n)"
            if ($userResponse -eq 'y') {
                Write-Host "Closing running Unity processes..."
                $unityProcesses | Stop-Process -Force
                Write-Host "Unity process killed"
            }
            else {
                Write-Host "Build stopped due to existing running Unity processes."
                return 1
            }
        }
        else {
            Write-Host "No running process found"
        }

        Write-Host "Building project... LogGuid: 1e5cbf84-6dbb-4483-a4c5-2365613479df"

        $process = Start-Process -FilePath $UnityPath -ArgumentList  "-quit", "-batchmode", "-executeMethod", $BuildMethod -NoNewWindow -PassThru -Wait
        $exitCode = $process.ExitCode
        Write-Host "Unity process exited with code: $exitCode. LogGuid: e2ef4f2a-1cff-44be-a79e-f9eff5521d14"
        
        if ($exitCode -eq 0) {
            Write-Host "Project was built successfully. LogGuid: 2c6d3d70-5602-481c-9e8d-88ceb53899b1"
            Write-Host "Build can be found at $BuildOutputFolderPath"
            # Start-Process -FilePath "explorer" -ArgumentList $BuildOutputFolderPath
            return 0
        }
        else {
            Write-Host "Project build failed. Exit code: $exitCode"
            # Open Unity Editor log in VS Code
            if (Test-Path -Path $LogFilePath) {
                Start-Process -FilePath $VSCodePath -ArgumentList $LogFilePath
            }
            else {
                Write-Host "Log file not found at: $LogFilePath"
            }
            return 1
        }
    }
    else {
        Write-Host "Unity executable not found at: $UnityPath"
        return 1
    }
}

# Function to convert bytes to a human-readable format
function Format-FileSize {
    Param ([int64]$Size)
    If ($Size -gt 1PB) { [string]::Format("{0:0.00} PB", $Size / 1PB) }
    ElseIf ($Size -gt 1TB) { [string]::Format("{0:0.00} TB", $Size / 1TB) }
    ElseIf ($Size -gt 1GB) { [string]::Format("{0:0.00} GB", $Size / 1GB) }
    ElseIf ($Size -gt 1MB) { [string]::Format("{0:0.00} MB", $Size / 1MB) }
    ElseIf ($Size -gt 1KB) { [string]::Format("{0:0.00} KB", $Size / 1KB) }
    Else { [string]::Format("{0} B", $Size) }
}

function BuildSize() {
    Write-Host "Build size of $BuildOutputFolderPath LogGuid: 8187ccd5-9ed5-43dc-988b-1982b8c330f8"
    $FolderSize = (Get-ChildItem -Path $BuildOutputFolderPath -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $FormattedSize = Format-FileSize -Size $FolderSize
    Write-Output "The size of the folder is: $FormattedSize"
}

function GitPush() {
    $current_location = Get-Location
    Write-Host "Deploying to web LogGuid: 8b04b1e8-ecae-4f7a-84fe-a6f34a63f3d7"
    Set-Location $WebFolder
    npm run build
    npm run deploy

    Write-Host "Setting location to $current_location LogGuid: faa4c0c9-cf29-4113-9fa4-d51d6e6303c0"
    Set-Location $current_location

    # Open with browser
    Start-Process -FilePath $edge_location -ArgumentList "https://github.com/reyou/CartoonKickoffWeb/deployments"
    Start-Process -FilePath $edge_location -ArgumentList "https://cartoonkickoff.com"
}

function WebBuild() {
    Write-Host "Building before copying files LogGuid: d50d6e26-20f4-4ad6-93e0-bb19073e961e"
    Build
    WebCopy
}

function WebCopy() {
    Write-Host "Copying files from $BuildOutputFolderPath to $WebBuildFolder LogGuid: 5790aeff-55b3-47d4-b493-4c01f4cf87df"
    Copy-Item -Path "$BuildOutputFolderPath\*" -Destination $WebBuildFolder -Recurse -Force -Exclude "index.html"
}

function WebDeploy() {
    Write-Host "Running build LogGuid: d17b1774-1d16-4408-82e7-4dc76d0dcf37"
    $build_result = Build
    if ($build_result -eq 0) {
        Write-Host "Moving files to CartoonKickoffWeb repo LogGuid: dfd41197-c7bc-474c-9afc-5427d36d8820"
        WebCopy
        Write-Host "Pushing changes to Github LogGuid: a35733d4-a14a-40b8-a054-f3be76dae18f"
        GitPush
    }
    else {
        Write-Host "Build was not completed. Check logs for more details."
    }
}

function Analytics() {
    Write-Host "Welcome to Analytics"
    Start-Process -FilePath $edge_location -ArgumentList "https://firebase.google.com/docs/analytics/unity/start"
}

function main {
    param (
        [string[]]$params
    )
    
    Clear-Host
    Write-Host "CartoonKickoff main"
    Write-Host "dotnet version"
    dotnet --version
    
    $action = $params[0]
    
    switch ($action) {
        "build" {
            Build
        }
        "android" {
            AndroidBuild
        }
        "build-size" {
            BuildSize
        }
        "server" {
            Server
        }
        "web-build" {
            WebBuild
        }
        "web-deploy" {
            WebDeploy
        }
        "publish" {
            WebDeploy
        }
        "analytics" {
            Analytics
        }
        default {
            Write-Host "Unknown action: '$action'."
        }
    }
}

main $args
