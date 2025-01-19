export interface LanguageConfig {
  id: string;
  name: string;
  extension: string;
  boilerplate: string;
  pistonId: string;
}

export const languageConfigs: Record<string, LanguageConfig> = {
  cpp: {
    id: 'cpp',
    name: 'C++',
    extension: '.cpp',
    pistonId: 'c++',
    boilerplate: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,
  },
  python: {
    id: 'python',
    name: 'Python',
    extension: '.py',
    pistonId: 'python3',
    boilerplate: `def main():
    print("Hello World!")

if __name__ == "__main__":
    main()`,
  },
  java: {
    id: 'java',
    name: 'Java',
    extension: '.java',
    pistonId: 'java',
    boilerplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
  },
}; 