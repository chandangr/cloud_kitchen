"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DeliveryTrackingProps {
  deliveryId: string;
}

interface DeliveryStatus {
  status: string;
  progress: number;
  estimatedTime: string;
  driverName?: string;
  driverPhone?: string;
}

export function DeliveryTracking({ deliveryId }: DeliveryTrackingProps) {
  const [status, setStatus] = useState<DeliveryStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryStatus = async () => {
      try {
        const response = await fetch(`/api/porter/tracking/${deliveryId}`);
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching delivery status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliveryStatus();
    const interval = setInterval(fetchDeliveryStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [deliveryId]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Unable to fetch delivery status
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <span className="text-sm text-primary">{status.status}</span>
          </div>
          <Progress value={status.progress} className="h-2" />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Estimated Delivery Time</span>
          <p className="text-sm text-muted-foreground">
            {status.estimatedTime}
          </p>
        </div>

        {status.driverName && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Delivery Partner</span>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {status.driverName}
              </p>
              <Button variant="ghost" size="sm">
                Call
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
