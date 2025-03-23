# Development on iOS

Unfortunately, developing for iOS with React Native requires a Mac because Xcode (Apple’s official development environment) is only available on macOS. Xcode is essential for compiling your app, running it on a simulator, and testing it on a real device.

## Install Dependencies

### 1. Install XCode

The first step is to install Xcode, which provides the iOS simulator, build tools, and everything needed to run your app on an iPhone.

- If you're using the **latest version of macOS**, you can install Xcode **directly from the App Store**:  
  [Xcode on the Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)

- If your **Mac is older and doesn’t support the latest macOS**, the latest Xcode might not be available in the App Store. In that case, you can check which version of Xcode is compatible with your macOS version using [this website](https://xcodereleases.com/).

#### Installing an older version of Xcode:

1. Find the latest compatible Xcode version for your macOS on [Xcode Releases](https://xcodereleases.com/).
2. Download the `.xip` file from Apple's developer portal or another trusted source.
3. Once downloaded, **double-click to unzip** the `.xip` file (this might take a while).
4. Drag the extracted `Xcode.app` file into your **Applications** folder.
5. Open Xcode, and if prompted, install additional developer tools.

### 2. Install Node and NPM

Node is a JavaScript runtime built on Chrome's V8 engine, allowing developers to run JavaScript code outside of a browser. It's commonly used for backend development, scripting, and building full-stack applications. In our case, we'll be using it to run the frontend in development mode.

NPM (Node Package Manager) is the default package manager for Node.js. It allows you to install and manage JavaScript libraries and dependencies for your projects.

To install Node and NPM, I'd recommend following [instructions provided by NodeJS](https://nodejs.org/en/download), using nvm.

### 3. Install Rust and Cargo

Rust is a modern systems programming language known for its performance, safety, and concurrency features. It eliminates common bugs like null pointer dereferences and data races, making it a popular choice for systems, web, and embedded development.

Cargo is Rust's package manager and build system. It helps manage dependencies, compile projects, run tests, and publish Rust packages.

To install Rust and Cargo, I'd recommend following [instructions provided by Rust](https://www.rust-lang.org/tools/install), using rustup.
