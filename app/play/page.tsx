import { songsLists } from "@/dummyData/songsLists";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconMusic, IconPlayerPlay, IconHeadphones } from "@tabler/icons-react";

export default function Page() {
    // Color gradients for each song item
    const colorGradients = [
        "from-purple-500/10 to-pink-500/10 border-purple-500/20",
        "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
        "from-green-500/10 to-emerald-500/10 border-green-500/20",
        "from-orange-500/10 to-red-500/10 border-orange-500/20",
        "from-indigo-500/10 to-purple-500/10 border-indigo-500/20",
    ];

    const iconColors = [
        "text-purple-500",
        "text-blue-500",
        "text-green-500",
        "text-orange-500",
        "text-indigo-500",
    ];

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                            <IconMusic className="size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Playlist
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                                <IconHeadphones className="size-4" />
                                {songsLists.length} songs
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {songsLists.map((song, index) => {
                        const gradientClass = colorGradients[index % colorGradients.length];
                        const iconColor = iconColors[index % iconColors.length];

                        return (
                            <Button
                                key={song.id}
                                variant="ghost"
                                className={`w-full justify-start h-auto py-4 px-6 transition-all border bg-gradient-to-r ${gradientClass} hover:scale-[1.02] hover:shadow-md group`}
                                asChild
                            >
                                <Link href={`/play/${song.id}`}>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                                            <IconPlayerPlay className={`size-5 ${iconColor} ml-0.5`} />
                                        </div>
                                        <div className="flex-shrink-0 w-8 text-center font-bold text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                                {song.name}
                                            </div>
                                            {song.description && (
                                                <div className="text-sm text-muted-foreground truncate mt-0.5">
                                                    {song.description}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                                            <IconMusic className="size-5" />
                                        </div>
                                    </div>
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

