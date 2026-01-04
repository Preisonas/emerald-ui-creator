// Ahujien Launcher - ImGui C++ Implementation
// This is the direct conversion from the React components

#include "imgui.h"
#include <cmath>
#include <vector>
#include <string>

// ============================================================================
// PARTICLE SYSTEM (ImGuiParticles.tsx equivalent)
// ============================================================================

struct Particle {
    float baseX, baseY;
    float phase;
    float speed;
    float x, y;
};

static std::vector<Particle> particles;
static float animTime = 0.0f;
static bool particlesInitialized = false;

void InitParticles() {
    particles.clear();
    for (int i = 0; i < 8; i++) {
        Particle p;
        p.baseX = 50.0f + (float)(rand() % 300);
        p.baseY = 50.0f + (float)(rand() % 250);
        p.phase = (float)(rand() % 628) / 100.0f; // 0 to 2PI
        p.speed = 0.3f + (float)(rand() % 40) / 100.0f; // 0.3 to 0.7
        p.x = p.baseX;
        p.y = p.baseY;
        particles.push_back(p);
    }
    particlesInitialized = true;
}

void RenderParticles(ImDrawList* drawList, ImVec2 windowPos) {
    if (!particlesInitialized) {
        InitParticles();
    }
    
    // Update particle positions (sinusoidal motion)
    animTime += ImGui::GetIO().DeltaTime;
    for (auto& p : particles) {
        p.x = p.baseX + sinf(animTime * p.speed + p.phase) * 20.0f;
        p.y = p.baseY + cosf(animTime * p.speed * 0.7f + p.phase) * 15.0f;
    }
    
    // Draw particles with layered glow effect
    // Primary color: hsl(160, 84%, 39%) = rgb(16, 183, 127) = #10B77F
    ImU32 glowColors[] = {
        IM_COL32(16, 183, 127, 13),   // Outer glow (0.05 alpha)
        IM_COL32(16, 183, 127, 26),   // (0.1 alpha)
        IM_COL32(16, 183, 127, 51),   // (0.2 alpha)
        IM_COL32(16, 183, 127, 77),   // (0.3 alpha)
        IM_COL32(16, 183, 127, 128),  // (0.5 alpha)
        IM_COL32(16, 183, 127, 179),  // (0.7 alpha)
        IM_COL32(16, 183, 127, 230),  // Core (0.9 alpha)
    };
    float radii[] = { 12.0f, 10.0f, 8.0f, 6.0f, 4.0f, 3.0f, 2.0f };
    
    for (const auto& p : particles) {
        ImVec2 center(windowPos.x + p.x, windowPos.y + p.y);
        
        // Draw concentric circles from outer to inner
        for (int i = 0; i < 7; i++) {
            drawList->AddCircleFilled(center, radii[i], glowColors[i], 16);
        }
    }
}

// ============================================================================
// MAIN LAUNCHER (LauncherCard.tsx + DashboardView.tsx equivalent)
// ============================================================================

// State variables (React useState equivalents)
static char username[256] = "";
static char password[256] = "";
static bool loggedIn = false;
static int selectedSoftware = -1; // -1 = none selected

// Software data
struct Software {
    const char* id;
    const char* name;
    const char* description;
    const char* icon; // "shield" or "zap"
};

static Software softwareList[] = {
    { "fivem-stealth", "FiveM Stealth", "Undetected bypass solution", "shield" },
    { "fivem-full", "FiveM Full", "Complete feature package", "zap" }
};
static const char* expiryDate = "Jan 15, 2026";

// Colors
static ImVec4 primaryColor = ImVec4(0.06f, 0.72f, 0.50f, 1.0f);      // #10B77F
static ImVec4 bgColor = ImVec4(0.05f, 0.05f, 0.05f, 1.0f);           // Dark background
static ImVec4 cardBgColor = ImVec4(0.07f, 0.07f, 0.07f, 0.95f);      // Card background
static ImVec4 inputBgColor = ImVec4(0.08f, 0.08f, 0.08f, 1.0f);      // Input background
static ImVec4 borderColor = ImVec4(0.15f, 0.15f, 0.15f, 1.0f);       // Border
static ImVec4 mutedColor = ImVec4(0.6f, 0.6f, 0.6f, 1.0f);           // Muted text

// ============================================================================
// LOGIN VIEW
// ============================================================================

void RenderLoginView() {
    ImVec2 windowSize(420, 350);
    ImVec2 displaySize = ImGui::GetIO().DisplaySize;
    ImVec2 windowPos((displaySize.x - windowSize.x) / 2, (displaySize.y - windowSize.y) / 2);
    
    ImGui::SetNextWindowPos(windowPos);
    ImGui::SetNextWindowSize(windowSize);
    
    ImGuiWindowFlags flags = ImGuiWindowFlags_NoTitleBar | 
                             ImGuiWindowFlags_NoResize | 
                             ImGuiWindowFlags_NoMove |
                             ImGuiWindowFlags_NoScrollbar;
    
    // Push card styling
    ImGui::PushStyleColor(ImGuiCol_WindowBg, cardBgColor);
    ImGui::PushStyleColor(ImGuiCol_Border, ImVec4(primaryColor.x, primaryColor.y, primaryColor.z, 0.3f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 16.0f);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 1.0f);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(32, 32));
    
    if (ImGui::Begin("LoginCard", nullptr, flags)) {
        ImDrawList* drawList = ImGui::GetWindowDrawList();
        ImVec2 winPos = ImGui::GetWindowPos();
        
        // Render floating particles
        RenderParticles(drawList, winPos);
        
        // Title - centered "Ahujien"
        const char* title = "Ahujien";
        ImVec2 titleSize = ImGui::CalcTextSize(title);
        ImGui::SetCursorPosX((windowSize.x - titleSize.x) / 2);
        ImGui::PushStyleColor(ImGuiCol_Text, primaryColor);
        ImGui::TextUnformatted(title);
        ImGui::PopStyleColor();
        
        ImGui::Dummy(ImVec2(0, 30));
        
        // Username input
        ImGui::TextColored(mutedColor, "Username");
        ImGui::PushStyleColor(ImGuiCol_FrameBg, inputBgColor);
        ImGui::PushStyleColor(ImGuiCol_Border, borderColor);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, 8.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_FramePadding, ImVec2(16, 12));
        ImGui::PushItemWidth(-1);
        ImGui::InputText("##username", username, 256);
        ImGui::PopItemWidth();
        ImGui::PopStyleVar(2);
        ImGui::PopStyleColor(2);
        
        ImGui::Dummy(ImVec2(0, 8));
        
        // Password input
        ImGui::TextColored(mutedColor, "Password");
        ImGui::PushStyleColor(ImGuiCol_FrameBg, inputBgColor);
        ImGui::PushStyleColor(ImGuiCol_Border, borderColor);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, 8.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_FramePadding, ImVec2(16, 12));
        ImGui::PushItemWidth(-1);
        ImGui::InputText("##password", password, 256, ImGuiInputTextFlags_Password);
        ImGui::PopItemWidth();
        ImGui::PopStyleVar(2);
        ImGui::PopStyleColor(2);
        
        ImGui::Dummy(ImVec2(0, 16));
        
        // Login button
        ImGui::PushStyleColor(ImGuiCol_Button, primaryColor);
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(primaryColor.x * 1.1f, primaryColor.y * 1.1f, primaryColor.z * 1.1f, 1.0f));
        ImGui::PushStyleColor(ImGuiCol_ButtonActive, ImVec4(primaryColor.x * 0.9f, primaryColor.y * 0.9f, primaryColor.z * 0.9f, 1.0f));
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, 8.0f);
        
        if (ImGui::Button("Login", ImVec2(-1, 44))) {
            loggedIn = true;
        }
        
        ImGui::PopStyleVar();
        ImGui::PopStyleColor(3);
    }
    ImGui::End();
    
    ImGui::PopStyleVar(3);
    ImGui::PopStyleColor(2);
}

// ============================================================================
// DASHBOARD VIEW
// ============================================================================

void RenderDashboardView() {
    ImVec2 windowSize(420, 450);
    ImVec2 displaySize = ImGui::GetIO().DisplaySize;
    ImVec2 windowPos((displaySize.x - windowSize.x) / 2, (displaySize.y - windowSize.y) / 2);
    
    ImGui::SetNextWindowPos(windowPos);
    ImGui::SetNextWindowSize(windowSize);
    
    ImGuiWindowFlags flags = ImGuiWindowFlags_NoTitleBar | 
                             ImGuiWindowFlags_NoResize | 
                             ImGuiWindowFlags_NoMove |
                             ImGuiWindowFlags_NoScrollbar;
    
    ImGui::PushStyleColor(ImGuiCol_WindowBg, cardBgColor);
    ImGui::PushStyleColor(ImGuiCol_Border, ImVec4(primaryColor.x, primaryColor.y, primaryColor.z, 0.3f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 16.0f);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 1.0f);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(32, 32));
    
    if (ImGui::Begin("Dashboard", nullptr, flags)) {
        ImDrawList* drawList = ImGui::GetWindowDrawList();
        ImVec2 winPos = ImGui::GetWindowPos();
        
        // Render floating particles
        RenderParticles(drawList, winPos);
        
        // Title
        const char* title = "Ahujien";
        ImVec2 titleSize = ImGui::CalcTextSize(title);
        ImGui::SetCursorPosX((windowSize.x - titleSize.x) / 2);
        ImGui::PushStyleColor(ImGuiCol_Text, primaryColor);
        ImGui::TextUnformatted(title);
        ImGui::PopStyleColor();
        
        ImGui::Dummy(ImVec2(0, 20));
        
        // "Select Software" label
        ImGui::TextColored(mutedColor, "Select Software");
        ImGui::Dummy(ImVec2(0, 8));
        
        // Software selection cards
        for (int i = 0; i < 2; i++) {
            bool isSelected = (selectedSoftware == i);
            
            ImGui::PushID(i);
            
            // Card styling
            ImVec4 cardBg = isSelected ? 
                ImVec4(primaryColor.x * 0.15f, primaryColor.y * 0.15f, primaryColor.z * 0.15f, 1.0f) : 
                inputBgColor;
            ImVec4 cardBorder = isSelected ? 
                primaryColor : 
                borderColor;
            
            ImGui::PushStyleColor(ImGuiCol_ChildBg, cardBg);
            ImGui::PushStyleVar(ImGuiStyleVar_ChildRounding, 12.0f);
            ImGui::PushStyleVar(ImGuiStyleVar_ChildBorderSize, 1.0f);
            
            // Draw border manually for colored border
            ImVec2 cursorPos = ImGui::GetCursorScreenPos();
            ImVec2 cardSize(windowSize.x - 64, 70);
            
            if (ImGui::BeginChild(softwareList[i].id, cardSize, true)) {
                // Draw colored border
                drawList->AddRect(
                    cursorPos, 
                    ImVec2(cursorPos.x + cardSize.x, cursorPos.y + cardSize.y),
                    ImGui::ColorConvertFloat4ToU32(cardBorder),
                    12.0f, 0, 1.0f
                );
                
                ImGui::SetCursorPos(ImVec2(16, 12));
                
                // Icon placeholder (circle with icon representation)
                ImVec2 iconPos = ImGui::GetCursorScreenPos();
                drawList->AddCircleFilled(
                    ImVec2(iconPos.x + 18, iconPos.y + 18),
                    18.0f,
                    IM_COL32(16, 183, 127, 40)
                );
                // Draw icon symbol
                ImGui::SetCursorPosX(ImGui::GetCursorPosX() + 12);
                ImGui::TextColored(primaryColor, softwareList[i].icon[0] == 's' ? "S" : "Z");
                
                ImGui::SameLine();
                ImGui::SetCursorPosX(56);
                
                // Software name and description
                ImGui::BeginGroup();
                ImGui::TextUnformatted(softwareList[i].name);
                ImGui::TextColored(mutedColor, "%s", softwareList[i].description);
                ImGui::EndGroup();
                
                // Radio button indicator on the right
                ImGui::SameLine();
                ImGui::SetCursorPosX(cardSize.x - 40);
                ImGui::SetCursorPosY(ImGui::GetCursorPosY() + 10);
                
                ImVec2 radioPos = ImGui::GetCursorScreenPos();
                drawList->AddCircle(
                    ImVec2(radioPos.x + 8, radioPos.y + 8),
                    8.0f,
                    isSelected ? ImGui::ColorConvertFloat4ToU32(primaryColor) : IM_COL32(100, 100, 100, 255),
                    16, 2.0f
                );
                if (isSelected) {
                    drawList->AddCircleFilled(
                        ImVec2(radioPos.x + 8, radioPos.y + 8),
                        4.0f,
                        ImGui::ColorConvertFloat4ToU32(primaryColor)
                    );
                }
                
                // Handle click
                if (ImGui::IsWindowHovered() && ImGui::IsMouseClicked(0)) {
                    selectedSoftware = i;
                }
            }
            ImGui::EndChild();
            
            ImGui::PopStyleVar(2);
            ImGui::PopStyleColor();
            ImGui::PopID();
            
            ImGui::Dummy(ImVec2(0, 8));
        }
        
        ImGui::Dummy(ImVec2(0, 8));
        
        // Launch button
        bool canLaunch = (selectedSoftware >= 0);
        
        if (!canLaunch) {
            ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(0.3f, 0.3f, 0.3f, 1.0f));
            ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(0.3f, 0.3f, 0.3f, 1.0f));
            ImGui::PushStyleColor(ImGuiCol_ButtonActive, ImVec4(0.3f, 0.3f, 0.3f, 1.0f));
        } else {
            ImGui::PushStyleColor(ImGuiCol_Button, primaryColor);
            ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(primaryColor.x * 1.1f, primaryColor.y * 1.1f, primaryColor.z * 1.1f, 1.0f));
            ImGui::PushStyleColor(ImGuiCol_ButtonActive, ImVec4(primaryColor.x * 0.9f, primaryColor.y * 0.9f, primaryColor.z * 0.9f, 1.0f));
        }
        
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, 8.0f);
        
        if (ImGui::Button("Launch", ImVec2(-1, 44)) && canLaunch) {
            // Launch selected software
            printf("Launching: %s\n", softwareList[selectedSoftware].id);
        }
        
        ImGui::PopStyleVar();
        ImGui::PopStyleColor(3);
        
        ImGui::Dummy(ImVec2(0, 16));
        
        // Expiry notification box
        ImVec2 notifPos = ImGui::GetCursorScreenPos();
        ImVec2 notifSize(windowSize.x - 64, 40);
        
        drawList->AddRectFilled(
            notifPos,
            ImVec2(notifPos.x + notifSize.x, notifPos.y + notifSize.y),
            IM_COL32(16, 183, 127, 20),
            8.0f
        );
        drawList->AddRect(
            notifPos,
            ImVec2(notifPos.x + notifSize.x, notifPos.y + notifSize.y),
            IM_COL32(16, 183, 127, 77),
            8.0f, 0, 1.0f
        );
        
        ImGui::SetCursorPosX(ImGui::GetCursorPosX() + 12);
        ImGui::SetCursorPosY(ImGui::GetCursorPosY() + 10);
        ImGui::TextColored(primaryColor, "Expires: %s", expiryDate);
    }
    ImGui::End();
    
    ImGui::PopStyleVar(3);
    ImGui::PopStyleColor(2);
}

// ============================================================================
// MAIN RENDER FUNCTION - Call this in your render loop
// ============================================================================

void RenderAhujienLauncher() {
    if (loggedIn) {
        RenderDashboardView();
    } else {
        RenderLoginView();
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
/*
// In your main.cpp:

#include "imgui_launcher.cpp"

int main() {
    // ... Initialize your window and ImGui context ...
    
    while (!shouldClose) {
        // ... Begin frame ...
        
        ImGui::NewFrame();
        
        // Render the launcher
        RenderAhujienLauncher();
        
        ImGui::Render();
        
        // ... End frame and present ...
    }
    
    return 0;
}
*/
